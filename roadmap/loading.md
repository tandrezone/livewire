## Ideas
- data-loading attribute on an element that originates a request (ie `wire:model` input)
- if there is a component level action, shouldn't add to the root element
- data-global-loading for component or page level
- easy to target an outter or sibling element to see if it has loading attribute on it
- submit - should it have `data-loading`? That will trigger all within it
- all elements that trigger events get annotated rather than element that is listening for it
- e.target - add `data-loading` - `wire:change` on a div, should it be on a div
- does a submit button in a form show up in the event? Just add it to the submit button
- make it `data-wire-loading`
- `wire:target="$dispatch('foo')"` any magics should work somehow
- the triggering element and it's directive expression
- make an action for `$dispatch()` and then it can be `wire:target`

## Summary of problems (and # of discussions and ranked by #)
- [ ] 9 - target event dispatches/ method calls to the backend
- [ ] 5 - add an option for detecting/ watching loading states in javascript
- [ ] 5 - loading can target navigate requests
- [ ] 5 - access target parent loading states `wire:target="$parent.test()"`
- [ ] 4 - More robust multiple method with params targeting
- [ ] 4 - If `wire:loading` is on a button with `wire:click` allow other targets (so button can be disabled say during a form submission)
- [ ] 4 - File loading states should remain until completely finished
- [ ] 3 - `$refresh`/ magic actions can be targeted for loading states
- [ ] 3 - Target multiple attributes with `wire:loading.attr
- [ ] 2 - form submit without disabled/ readonly form loading states
- [ ] 1 - navigate progress bar should be in the top layer
- [ ] 1 - lazy component loading indicator/ placeholder
- [ ] 1 - Loading state while a stream is initiating, but not while running
- [ ] 1 - Loading on a nested component
- [ ] 1 - Better loading element display types
- [ ] 1 - Fix resetting loading states after validation failure
- [ ] 1 - Chain multiple loading directive modifiers
- [ ] 1 - Make sure loading cleans up when using renderless
- [ ] 1 - Show progress bar for file uploads
- [ ] 1 - Should be able to target form properties
- [ ] 1 - `wire:target.group`
- [ ] 1 - Trim target whitespace to fix error
- [ ] 1 - Loading styles not loaded when using `@livewireScriptConfig`
- [ ] 1 - Disable `wire:click` buttons when loading
- [ ] 0 - multiple file uploads to s3 can have individual loading states
- [ ] 0 - `wire:loading.global` to show an indicator for any loading

## Discussions
- `$refresh`/ magic actions can be targeted for loading states
	- [Wire $refresh doesn't trigger loading states](https://github.com/livewire/livewire/discussions/9303#top)
    - [[V3] Wire $refresh doesn't trigger loading states](https://github.com/livewire/livewire/discussions/6555#top)
    - [Magic action loading indicators not working](https://github.com/livewire/livewire/discussions/9176#top)
- navigate progress bar should be in the top layer
	- [Navigate: Page loading indicator not working](https://github.com/livewire/livewire/discussions/6569#top)
- add an option for detecting/ watching loading states in javascript
	- [How to listen to wire:loading changes in JavaScript](https://github.com/livewire/livewire/discussions/9288#top)
	- PR [Add $wire.isLoading() method for loading detection from Alpine or JS](https://github.com/livewire/livewire/pull/9389#top)
	- PR [POC: add wire.$loading property](https://github.com/livewire/livewire/pull/8146#top)
	- [Accessing loading state in Alpine JS and clinet-side in general](https://github.com/livewire/livewire/discussions/8477#top)
	- [Proposal: Add programmatic API equivalent for directives features: loading/dirty](https://github.com/livewire/livewire/discussions/8145#top)
- loading can target navigate requests
	- [wire:navigate prevents wire:loading directives to work on that element](https://github.com/livewire/livewire/discussions/9057#top)
	- [wire:loading for wire:navigate](https://github.com/livewire/livewire/discussions/7578#top)
	- PR [Add loading indicators for wire:navigate](https://github.com/livewire/livewire/pull/8118#top)
	- PR [Wire loading for wire navigate links](https://github.com/livewire/livewire/pull/8165#top)
	- [Way better UX thanks to this idea? Immediate view changes: cached route patterns + wire:loading.navigate directive = WIN?](https://github.com/livewire/livewire/discussions/7446#top)
- access target parent loading states `wire:target="$parent.test()"`
	- [Add a new modifier to check if parent component is loading](https://github.com/livewire/livewire/discussions/9093#top)
	- [Using $parent.mymethod and wire:loading does not work](https://github.com/livewire/livewire/discussions/7235#top)
	- PR [Support wire:loading on parent methods](https://github.com/livewire/livewire/pull/9356#top)
	- PR [Add parent modifier to wire:loading.](https://github.com/livewire/livewire/pull/9094#top)
	- [[V3] How to loading target point to $parent action paremeter?](https://github.com/livewire/livewire/discussions/6498#top)
- form submit without disabled/ readonly form loading states
	- [Form submit without disabled state](https://github.com/livewire/livewire/discussions/9301#top)
	- [livewire v3 - Livewire automatically disables forms while submitting issue](https://github.com/livewire/livewire/discussions/7706#top)
- multiple file uploads to s3 can have individual loading states
- lazy component loading indicator/ placeholder
	- [[V4] No render() method](https://github.com/livewire/livewire/discussions/9371#top)
- target event dispatches/ method calls to the backend
	- [Events to be used in wire:target of wire:loading](https://github.com/livewire/livewire/discussions/9045#top)
	- [Actions called by listeners don't trigger loading states when targeted](https://github.com/livewire/livewire/discussions/3080#top)
	- [Loading state on fired events](https://github.com/livewire/livewire/discussions/8751#top)
	- [Livewire update Network package size](https://github.com/livewire/livewire/discussions/8774#top)
	- PR [Add failing test for wire loading works when target function was called by event](https://github.com/livewire/livewire/pull/8269#top)
	- [Wire:loading don't work when function has called by event](https://github.com/livewire/livewire/discussions/8172#top)
	- [Any idea on using wire:loading on dispatch?](https://github.com/livewire/livewire/discussions/7287#top)
	- [Livewire v3 listen to any update events from other components on page to show loading spinner](https://github.com/livewire/livewire/discussions/8127#top)
	- [wire:loading not working on wire:click element](https://github.com/livewire/livewire/discussions/7353#top)
- `wire:loading.global` to show an indicator for any loading
- More robust multiple method with params targeting
	- PR [`wire:target` failing when a string argument has parenthesis](https://github.com/livewire/livewire/pull/9377#top)
	- [Loop with multiple targets](https://github.com/livewire/livewire/discussions/4441#top)
	- [Targeting multiple actions with action parameters - not working.](https://github.com/livewire/livewire/discussions/8522#top)
	- [Wire target using multiple function with parameter, seems not working?](https://github.com/livewire/livewire/discussions/8134#top)
- If `wire:loading` is on a button with `wire:click` allow other targets (so button can be disabled say during a form submission)
	- [wire:loading.attr="disabled" not working with wire:click](https://github.com/livewire/livewire/discussions/4755#top)
	- [wire:loading on multiple buttons](https://github.com/livewire/livewire/discussions/8411#top)
	- [wire:loading not working when wire:click is added to button](https://github.com/livewire/livewire/discussions/3475#top)
	- [wire:loading.attr don't work at wire.click](https://github.com/livewire/livewire/discussions/6985#top)
- Loading state while a stream is initiating, but not while running
	- [Is there a way to check if streaming is in progress?](https://github.com/livewire/livewire/discussions/8782#top)
- File loading states should remain until completely finished
	- [wire:loading does not stay on File Upload](https://github.com/livewire/livewire/discussions/6738#top)
	- PR [fix: file upload indicator](https://github.com/livewire/livewire/pull/8665#top)
	- [Livewire v3 - wire:loading.delay issue with file attachments](https://github.com/livewire/livewire/discussions/7891#top)
	- [File upload loading indicator stopping after upload url signed and not upload finished](https://github.com/livewire/livewire/discussions/6814#top)
- Loading on a nested component
	- [Using wire:loading on custom component?](https://github.com/livewire/livewire/discussions/8472#top)
- Better loading element display types
	- [Add support for additional inline-* display types in wire:loading](https://github.com/livewire/livewire/discussions/3472#top)
- Fix resetting loading states after validation failure
	- [[v3] wire:loading.delay element is showed and not removed for validation errors after 1 successful request](https://github.com/livewire/livewire/discussions/6338#top)
- Target multiple attributes with `wire:loading.attr`
	- [Enable multiple attributes when using .attr](https://github.com/livewire/livewire/discussions/8570#top)
	- PR [Support wire:loading.attr with multiple attributes](https://github.com/livewire/livewire/pull/9198#top)
	- [On submit set aria-busy attribute](https://github.com/livewire/livewire/discussions/7136#top)
- Chain multiple loading directive modifiers
	- [Livewire:loading Chaining](https://github.com/livewire/livewire/discussions/8337#top)
- Make sure loading cleans up when using renderless
	- [wire:loading issue](https://github.com/livewire/livewire/discussions/7369#top)
- Show progress bar for file uploads
	- [Firing the progress indicator with actions](https://github.com/livewire/livewire/discussions/7765#top)
- Should be able to target form properties
	- [[v3] wire:loading doesn't work if wire:target refers to a property in Form](https://github.com/livewire/livewire/discussions/6223#top)
- `wire:target.group`
	- [wire:target group](https://github.com/livewire/livewire/discussions/5765#top)
- Trim target whitespace
	- [Toggling classes with wire:loading.class - Leading or Trailing whitespace results in DOMException](https://github.com/livewire/livewire/discussions/7412#top)
- Loading styles not loaded when using `@livewireScriptConfig`
	- [styles is not auto injected if scripts are manually added](https://github.com/livewire/livewire/discussions/7416#top)
- Disable `wire:click` buttons when loading
	- [`wire:click.once`](https://github.com/livewire/livewire/discussions/7121#top)
