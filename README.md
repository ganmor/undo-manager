undo-manager
============

Very simple undo / redo manager.

Navigate through an array of action pointers

(Amd compliant)

How to use
-------

As a global module it references itself as window.UndoManager;
Or you can use it with amd.

```
var stack = UndoManager('MyEditor');
```

### Add an Action to the stack

```
stack.addAction(doActionFunction, undoActionFunction, context);
```

### Undo the last action

```
stack.undo();
```


### Redo the last action

```
stack.redo();
```

### Clear the stack

```
stack.clear();
```

### Utility methods

```
stack.isLastOfStack();
stack.isFirstOfStack();
```

