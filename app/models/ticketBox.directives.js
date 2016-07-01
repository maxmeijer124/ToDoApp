var moduleName='ticketBox.directives';

const Q = new WeakMap();
const SERVICE = new WeakMap();

class UniqueTicketTitle
{
  constructor($q, ticketBoxSvc){
    this.require='ngModel';
    this.restrict='A';

    Q.set(this, $q);
    SERVICE.set(this, ticketBoxSvc);
  }

  link(scope, elem, attrs, ngModelController){
    ngModelController.$asyncValidators.UniqueTicketTitle = function(value){

      return Q.get(UniqueTicketTitle.instance)((resolve, reject) => {
        SERVICE.get(UniqueTicketTitle.instance).checkIfTicketExists(value).then( result => {
          if(result){
            reject();
          }
          else{
            resolve();
          }
        });
      });
    };
  }

  static directiveFactory($q, ticketBoxSvc){
    UniqueTicketTitle.instance =new UniqueTicketTitle($q, ticketBoxSvc);
    return UniqueTicketTitle.instance;
  }
}

UniqueTicketTitle.directiveFactory.$inject = ['$q', 'ticketBoxSvc'];

angular.module(moduleName, [])
  .directive('UniqueTicketTitle', UniqueTicketTitle.directiveFactory);

export default moduleName;
