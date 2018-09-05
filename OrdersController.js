function addOrder(order) {

	var tables = document.getElementById("order_tables");
    var table = document.createElement("table");
    table.setAttribute("id", "table" + order.table_id);
    table.setAttribute("class", "orders_table");
	
	var tbody = document.createElement("tbody");

    var tableHeader = document.createElement("tr");
    tableHeader.setAttribute("class", "table_header");
    
    var headerRow = document.createElement("th");
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

function removeOrderById(id) {
    var table = document.getElementById("table" + id);
    if (table != null) {
	table.remove();
    }
}

function loadOrders() {
    for(var order in list) {
	addOrder(list[order]);
    }
}





