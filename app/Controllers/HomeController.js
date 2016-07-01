const INIT = new WeakMap();
const SERVICE = new WeakMap();
const TIMEOUT = new WeakMap();

class HomeController{
  constructor($timeout, ticketBoxSvc){
    SERVICE.set(this, ticketBoxSvc);
    TIMEOUT.set(this, $timeout);
    INIT.set(this, () => {
      SERVICE.get(this).getActiveTickets().then(tickets => {
        this.tickets = tickets;
      });
    });

    INIT.get(this)();
  }

  markTicketAsDone(ticketId, isTicketDone){
    return SERVICE.get(this).markTicketDone(ticketId, isTicketDone)
      .then(() => {
        INIT.get(this)();
        this.doneSuccess = true;
        this.doneSuccessMessage = isTicketDone ? "Ticket done." : "Ticket not done yet.";
        TIMEOUT.get(this)(() => {
          this.doneSuccess = false;
        }, 3500);
      });
  }

  addToClosed(ticketId){
    return SERVICE.get(this).addToClosed(ticketId)
      .then(() => {
        INIT.get(this)();
        this.closedSuccess = true;
        TIMEOUT.get(this)(() => {
          this.closedSuccess = false;
        }, 3500);
      });
  }
}

HomeController.$inject = ['$timeout', 'ticketBoxSvc'];

export default HomeController;