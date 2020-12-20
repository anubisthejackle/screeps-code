By using Mixins we are able to use Multiple Inheritance for our classes. This is important for code reusability, given the number of roles that are being built for this AI.

# Mixin Subclassing
Mixin Subclassing is what I'm calling the use of Mixins that are little more than methods that return a class that extends whatever class is passed to it.

## Example
In the below, slightly confusing code, we see multiple inheritence from two mixins, and a third superclass
> let Mixin = (superclass) => class extends superclass { /* Mixin code here */ }
> let SecondMixin = (superclass) => class extends superclass { /* Mixin code here */ }
> 
> class RoleClassName extends SecondMixin(Mixin(OriginalClassToExtend)){}

This would be akin to this in C#:

> class RoleClassName extends OriginalClassToExtend, Mixin, SecondMixin {}

# How Mixins are Used
Mixins are being used in the code as modular tasks. Each task that a creep can do will have a mixin, and then each role that can perform that task will extend that mixin.

## bodyBuild Method
The `bodyBuild` Method should be included in each and every Mixin. This method creates and modifies an array, compiling a complete list of the minimum body parts required for that role. 

This method is used for validation purposes only. It should not be used to determine structure of the spawned creep.

## Current List of Mixins
- [[Build]]
- [[Harvest]]
- [[Haul]]
- [[Upgrade]]
