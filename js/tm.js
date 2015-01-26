var _ = require('lodash');
var sprintf = require('sprintf').sprintf;

var TuringMachine = function(tapeSymbols, inputTape, transitions, startState) {
    // set values
    var symbols = _.clone(tapeSymbols).concat('_');
    var tape = ['_'].concat(_.clone(inputTape)).concat(['_']);
    var transitionTable = _.cloneDeep(transitions);
    var currentState = startState;
    var headPosition = 1;
    var halted = false;
    // validate the configuration
    validate();

    function validate () {
        // initially valid
        valid = true;
        // validate initial tape
        _.each(tape, function(symbol) {
            if (!_.contains(symbols, symbol)) {
                valid = false;
            }
        });
        // check the start state
        if (!_.contains(_.keys(transitionTable), startState)) {
            valid = false;
        }
        // check state symbols
        _.each(_.values(transitionTable), function(state) {
            if (!_.isEqual(_.keys(state), symbols)) {
                valid = false;
            }
            // check rules
            _.each(_.values(state), function(rule) {
                // Check the keys
                if (!_.isEqual(_.keys(rule), ['write', 'move', 'state'])) {
                    valid = false;
                }
                // Make sure the symbol to write is allowed
                if (!_.contains(symbols, rule.write)) {
                    valid = false;
                }
                // make sure left and right are the only move values
                if (!_.contains(['right', 'left'], rule.move)) {
                    valid = false;
                }
                // make sure the state exists
                if (!_.contains(_.keys(transitionTable).push(null), rule.state)) {
                    valid = false;
                }
            })
        });
        // return whether it's valid
        return valid;
    };
};

TuringMachine.prototype.debug = false;

TuringMachine.prototype.isHalted = function() {
    return halted;
};

TuringMachine.prototype.underHead = function() {
    return tape[headPosition];
};

TuringMachine.prototype.getTape = function() {
    return _.clone(tape);
};

TuringMachine.prototype.getState = function() {
    return currentState;
};

TuringMachine.prototype.step = function() {
    // If the machine is stopped, don't do anything
    if (halted) {
        return;
    }
    // get the rule for this state/input
    var rule = transitionTable[currentState][tape[headPosition]];
    //possibly print debug message
    if (TuringMachine.prototype.debug) {
        var str = "In state %s, read %s, wrote %s, moved %s, now in state %s";
        str = sprintf(str, currentState, tape[headPosition], rule.write,
                      rule.move, rule.state);
        console.log(str);
    }
    // if we've reached the final state
    if (!rule) {
        halted = true;
        return;
    }
    // write to the tape
    tape[headPosition] = rule.write;
    // move either left or right
    if (rule.move === 'left') {
        tape.headPosition -= 1;
    } else {
        tape.headPosition += 1;
    }
    // update the current state
    currentState = rule.state;
};

exports.TuringMachine = TuringMachine;
