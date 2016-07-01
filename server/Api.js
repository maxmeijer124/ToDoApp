var _ = require('underscore');
var tickets = require('./ticketBoxData').tickets;

function addATicket(newTicket) {
    var lastTicket = _.max(tickets, function (ticket) {
        return ticket.ticketId;
    });

    newTicket.ticketId = lastTicket.ticketId + 1;
    newTicket.done = false;
    newTicket.closed = false;

    tickets.push(newTicket);
    return newTicket;
}

function getTickets(isClosed) {
    return _.filter(tickets, function (ticket) {
        return ticket.closed === isClosed;
    });
}

function adjustTicket(adjustedTicket) {
    var ticketIndex = -1;
    var ticketInCollection = _.find(tickets, function (ticket) {
        ticketIndex++;
        return ticket.ticketId === adjustedTicket.ticketId;
    });

    if(!ticketInCollection){
        return null;
    }
    else{
        tickets[ticketIndex] = adjustedTicket;
        return adjustedTicket;
    }
}

function adjustDoneStatus(ticketId, isDone){
    var ticketIndex = -1;
    var ticketInCollection = _.find(tickets, function (ticket) {
        ticketIndex++;
        return ticket.ticketId === ticketId;
    });

    if(!ticketInCollection){
        return null;
    }
    else{
        tickets[ticketIndex].done = isDone;
        return tickets[ticketIndex];
    }
}

function addToClosed(ticketId){
    var ticketIndex = -1;
    var ticketInCollection = _.find(tickets, function (ticket) {
        ticketIndex++;
        return ticket.ticketId === ticketId;
    });

    if(!ticketInCollection){
        return null;
    }
    else{
        tickets[ticketIndex].closed = true;
        return tickets[ticketIndex];
    }
}

function ticketExists(title){
    var ticketInCollection = _.find(tickets, function (ticket) {
        return ticket.title === title;
    });

    return !!ticketInCollection;
}

module.exports = {
    getTickets: getTickets,
    addATicket: addATicket,
    adjustTicket: adjustTicket,
    adjustDoneStatus: adjustDoneStatus,
    addToClosed: addToClosed,
    ticketExists: ticketExists
};
