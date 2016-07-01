const SERVICE = new WeakMap();
const TIMEOUT = new WeakMap();

class AddTicketController{
    constructor($timeout, ticketBoxSvc){
        TIMEOUT.set(this, $timeout);
        SERVICE.set(this, ticketBoxSvc);
    }

    addTicket(){
        if(this.addTicketForm.$valid && this.ticket !== {}){
            SERVICE.get(this).addTicket(this.ticket).then(message => {
                this.addSuccess = true;
                TIMEOUT.get(this)(() => {
                    this.addSuccess = false;
                }, 2500);
                this.resetTicket();
            }, error => {
                this.addFailed = true;
                TIMEOUT.get(this)(() => {
                    this.addFailed = false;
               }, 2500);
            });
        }
    }

    resetTicket(){
        this.addTicketForm.$setPristine();
        this.addTicketForm.$setUntouched();
        this.ticket = {};
    }
}

AddTicketController.$inject = ['$timeout', 'ticketBoxSvc'];

export default AddTicketController;