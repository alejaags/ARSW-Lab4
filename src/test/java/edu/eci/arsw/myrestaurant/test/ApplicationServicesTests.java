package edu.eci.arsw.myrestaurant.test;

import edu.eci.arsw.myrestaurant.beans.BillCalculator;
import edu.eci.arsw.myrestaurant.model.Order;
import edu.eci.arsw.myrestaurant.services.OrderServicesException;
import edu.eci.arsw.myrestaurant.services.RestaurantOrderServices;
import edu.eci.arsw.myrestaurant.services.RestaurantOrderServicesStub;
import java.util.logging.Level;
import java.util.logging.Logger;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest()
public class ApplicationServicesTests {

    
    RestaurantOrderServices ros;

    
    @Test
    public void contextLoads() throws OrderServicesException{
        assertTrue("RestaurantOrderServices is not null", ros != null);
        
        int table = 2;
        
        Order o = new Order(table);
        
        o.addDish("HAMBURGER", 3); // 3 * 12300 * (1.19)
        o.addDish("PIZZA", 2); // 2 * 10000 * (1.19)
        o.addDish("BEER", 2); // 2 * 2500 * (1.16)
        
        ros.addNewOrderToTable(o);
        
        assertEquals(73511, ros.calculateTableBill(table));
    }
    
    @Test
    public void test2() throws OrderServicesException {
        assertTrue("RestaurantOrderServices is not null", ros != null);
        
        int table = 4;
        
        Order o = new Order(table);
        
        o.addDish("HOTDOG", 1); // 3 * 12300 * (1.19)
        
        ros.addNewOrderToTable(o);
        
        assertEquals(3570, ros.calculateTableBill(table));
    }
        
        
       

}
