import HomeController from './HomeController';
import AddTicketController from './AddTicketController';
import ClosedController from './ClosedController';

var moduleName='ticketBox.controllers';

angular.module(moduleName, [])
    .controller('ticketBox.homeController', HomeController)
    .controller('ticketBox.AddTicketController', AddTicketController)
    .controller('ticketBox.ClosedController', ClosedController);

export default moduleName;