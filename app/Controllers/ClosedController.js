const INIT = new WeakMap();
const SERVICE = new WeakMap();

class ClosedController{
    constructor(ticketBoxSvc){
        SERVICE.set(this, ticketBoxSvc);

        INIT.set(this, () =>{
            SERVICE.get(this).getClosedTickets().then(tickets => {
                this.tickets = tickets;
            });
        });

        INIT.get(this)();
    }
}

ClosedController.$inject = ['ticketBoxSvc'];

export default ClosedController;