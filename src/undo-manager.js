/*global define*/
(function () {
	
	'use strict';
	
	/**
	*
	* TODO: Maybe there should be a maximum stack size ?
	*	Should it be global ? per instance ? 
	**/
	var undoManagersByStackName = {},
		UndoManager = function () {
			this.actionStack = [];
			this.actionPointer = -1;
		},
		Factory;

	UndoManager.prototype = {

		addAction : function (operation, undoOperation, context) {
			var op = {
				operation : operation,
				undoOperation : undoOperation,
				context : context
			};
			this.actionStack.push(op);
			this.actionPointer = this.actionStack.length - 1;
		},

		/**
		 * Undo the last action on the stack
		 */
		undo : function () {

			if (this.actionPointer < -1) { return; }
				

			this.actionStack[this.actionPointer].undoOperation.call(this.actionStack[this.actionPointer].context);
			this.actionPointer = this.actionPointer - 1;

		},

		 /**
		 *   Play the last action on the stack again
		 */
		redo : function () {

			if (this.actionPointer > this.actionStack.length - 1) { return; }

			this.actionPointer = this.actionPointer + 1;
			this.actionStack[this.actionPointer].operation.call(this.actionStack[this.actionPointer].context);

		},

		/**
		 * Did we undo some action ?
		 * @returns {Boolean}
		 */
		isLastOfStack : function () {
			return this.actionPointer >= this.actionStack.length - 1;
		},

		/**
		 * Have we reached the beginning ?
		 */
		isFirstOfStack : function () {
			return this.actionPointer < 0;
		},


		/**
		 * Reset the action stack
		 */
		clean : function () {
			this.actionStack = [];
			this.actionPointer = -1;
		}
	};

	// Factory Method, undo managers are singletons..
	Factory = function (stackName) {

		if (!undoManagersByStackName[stackName]) {
			undoManagersByStackName[stackName] = new UndoManager();
		}

		return undoManagersByStackName[stackName];
	};


	// Register as amd if needed
	if (typeof define === 'function' && define.amd) {
		define([], function () {
			return Factory;
		});
	}

}.call(this));
