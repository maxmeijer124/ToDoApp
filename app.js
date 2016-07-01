var express = require('express');
var bodyParser = require('body-parser');

var Api = require('./server/Api');

var app = express();
app.use(bodyParser());
app.use(express.static('.'));

app.get('/api/activeTickets', function (request, response) {
    response.send(Api.getTickets(false));
});

app.get('/api/closedTickets', function (request, response) {
    response.send(Api.getTickets(true));
});

app.post('/api/tickets', function (request, response) {
    var newTicket=request.body;
    if(!newTicket.title){
        response.send(500,{errorText:'No data found to add'});
    }
    else {
        Api.addATicket(newTicket);
        response.send(200, {message: 'New ticket added to the list'});
    }
});

app.put('/api/markDone/:id', function (request, response) {
    if(!request.params.id){
        response.send(500,{errorText:'ticketId not sent'});
    }
    else if(request.body.done === undefined || request.body.done === null){
        response.send(500,{errorText:'No data found to edit'});
    }
    else{
        var adjustedTicket = Api.adjustDoneStatus(parseInt(request.params.id), request.body.done);
        if(adjustedTicket === null){
            response.send(500,{errorText:'Ticket not found in the list'});
        }
        else{
            response.send(adjustedTicket);
        }
    }
});

app.put('/api/addToClosed/:id', function (request, response) {
    if(!request.params.id){
        response.send(500,{errorText:'Can\'t update ticket if id is not sent'});
    }
    else{
        var adjustedTicket = Api.addToClosed(parseInt(request.params.id));
        if(adjustedTicket === null){
            response.send(500,{errorText:'Ticket not found in the list'});
        }
        else{
            response.send(adjustedTicket);
        }
    }
});

app.get('/api/ticketExists/:title', function (request, response) {
    if(!request.params.title){
        response.send(500, {errorText:'Can\'t check existence of ticket if title is not sent'});
    }
    else{
        response.send(Api.ticketExists(request.params.title));
    }
});

app.get('/', function (request, response) {
    response.sendfile('Index.html');
});



app.listen(3000, function () {
    console.log('Express server started!!!');
});


