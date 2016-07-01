var moduleName='ticketBox.services';

const HTTP = new WeakMap();

class TicketBoxService
{
  constructor($http)
  {
    HTTP.set(this, $http);
  }

  getActiveTickets(){
    return HTTP.get(this).get('/api/activeTickets').then(result => result.data );
  }

  getClosedTickets(){
    return HTTP.get(this).get('/api/closedTickets').then(result => result.data );
  }

  markTicketDone(ticketId, isTicketDone){
    return HTTP.get(this).put(`/api/markDone/${ticketId}`, {ticketId: ticketId, done: isTicketDone});
  }

  addToClosed(ticketId){
    return HTTP.get(this).put(`/api/addToClosed/${ticketId}`,{});
  }

  checkIfTicketExists(title){
    return HTTP.get(this).get(`/api/ticketExists/${title}`).then(result =>  result.data );
  }

  addTicket(ticket){
    return HTTP.get(this).post('/api/tickets', ticket);
  }

  static ticketBoxFactory($http){
    return new TicketBoxService($http);
  }
}

TicketBoxService.ticketBoxFactory.$inject = ['$http'];

angular.module(moduleName, [])
  .factory('ticketBoxSvc', TicketBoxService.ticketBoxFactory);

export default moduleName;
