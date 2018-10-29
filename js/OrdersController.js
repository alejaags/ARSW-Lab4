function addOrder(order) {

	var tables = document.getElementById("order_tables");
    var table = document.createElement("table");
    table.setAttribute("id", "table" + order.table_id);
    table.setAttribute("class", "orders_table");
	
	var tbody = document.createElement("tbody");

    var tableHeader = document.createElement("tr");
    tableHeader.setAttribute("class", "table_header");
	
	var PRODUCTS;
    
    var headerRow = document.createElement("th");
	var DEFAULT_ADDRESS = 'http://localhost:8080'; // XXX
	var server_url = DEFAULT_ADDRESS + '/orders';
	
	
	
	
    headerRow.innerHTML = "Product";
    tableHeader.appendChild(headerRow);
    headerRow = document.createElement("th");
    headerRow.innerHTML = "Quantity";
    tableHeader.appendChild(headerRow);
    headerRow = document.createElement("th");
    headerRow.innerHTML = "Price";
    tableHeader.appendChild(headerRow);
    tbody.appendChild(tableHeader);

    for(index = 0 ; index < order.products.length; index++) {
		var product = order.products[index];
		var row = document.createElement("tr");
		row.setAttribute("id", "table" + order.table_id + "_dish" + (index+1));
		row.setAttribute("class", "table_product");
		tbody.appendChild(row);
	
		var productName = document.createElement("td");
		productName.setAttribute("class", "product_name");
		productName.innerHTML = product.product;
	
		var productQuantity = document.createElement("td");
		productQuantity.setAttribute("class", "product_quantity");
		productQuantity.innerHTML = product.quantity;
	
		var productPrice = document.createElement("td");
		productPrice.setAttribute("class", "product_price");
		productPrice.innerHTML = product.price;
	
		row.appendChild(productName);
		row.appendChild(productQuantity);
		row.appendChild(productPrice);
    }

    table.appendChild(tbody);
    tables.appendChild(table);

}

var addOrdersUpdateTable = function (orders, tableid) {
	console.log('tableid: ', tableid);
	clearTables();

	assert(orders.length > 0, 'there\'s are no orders available');

	var order = orders.filter(function (e) {
	    return e.table_id == tableid;
	});

	assert(order.length == 1, 'this should not happen');
	console.log(order[0]);

	changeAdditionTable(orders, tableid);
	addUpdateTable(order[0]);
    };

    var changeAdditionTable = function (orders, tableid) {
	// TODO
    };

    var addUpdateTable = function (order) {
	// TODO
    };

    var clearTables = function () {
	// jQuery es una chimba!
	$('#order_tables').html('');

	$('.table_option').remove();
	$('.table_item').remove();
    };

    var getOrders = function (callback) {
	RestControllerModule.getOrders({
	    onSuccess: callback.onSuccess,
	    onFailed: callback.onFailed
	});
    };

    var assert = function(condition, msg = null) {
	if (!condition) {
	    var assertMsg = 'Assertion Error';
	    if (msg != null) {
		assertMsg += ': ' + msg;
	    }
	    throw new Error(assertMsg);
	}
    };

    var currentOrders = [];

    /* PUBLIC */
    
    var showOrdersByTable = function () {
	var callback = {

            onSuccess: function(ordersList){
		// console.log(ordersList);
		clearTables();
		
		for(var i in ordersList) {
		    addTable(ordersList[i]);
		}
            },
            onFailed: function (exception) {
		console.log(exception);
            }
	};
	
	getOrders(callback);
    };

    var updateOrder = function () {
	// TODO
    };

    var deleteOrderItem = function (itemName) {
	// todo implement
    };

    var addItemToOrder = function (orderId, item) {
	var callback = {
	    onSuccess : function (dummy) {
		console.log(currentOrders);
		var order = currentOrders.filter(function (e) {
		    return orderId == e.table_id;
		});
		console.log(order);
		assert(order.length == 1, "order not found " + order.length);
		order = order[0];

		var prod = order.products.filter(function (e){
		    return e.product == item.product;
		});

		assert(prod.length == 0, 'item already exists ' + prod.length);

		order.products.push(item);
		RestControllerModule.updateOrder(order, {
		    onSuccess: function (payload) {
			showOrdersOfTable();
		    },
		    onFailed: function (error) {
			console.log('ERROR updating the order: ' + error);
		    }});
	    },
	    onFailed: function (error) {
		console.log('Error adding item to order');
	    }
	};
	
	getOrders(callback);
    };

    var showOrdersOfTable = function (tableid = null) {
	console.log("tableid:", tableid);
	
	getOrders({
	    onSuccess: function (payload) {
		if (tableid == null) {
		    tableid = payload[0].table_id;
		}
		addOrdersUpdateTable(payload, tableid);
	    },
	    onFailed: function (error) {
		console.log(error);
	    }});
    };

    return {
	showOrdersByTable: showOrdersByTable,
	updateOrder: updateOrder,
	deleteOrderItem: deleteOrderItem,
	addItemToOrder: addItemToOrder,
	showOrdersOfTable : showOrdersOfTable
    };

})();