# Screeps Code
This is my regular, non-ANN and non-Genetic Algorithm Screeps code.

## Notes:

### Remembering Locations
Find is an expensive method. The problem is, we aren't given enough memory to remember the entire map. There must be a trade-off between that which we remember, and that which we forget. In the Genetic Algorithm I have it coded to remember anything that a Creep comes in contact with. This has become truly inefficient, and should be changed.

#### Some ideas
1. Resources should be opportunistic. In other words, don't remember dropped resource locations. If a creep sees a resource, and it isn't currently carrying at full capacity, it should recover those resources and continue on with the job that it was previously doing.
2. Sources and Mineral locations should be permanently remembered. These don't change, and they regenerate.
3. Everything else should have a "Forget Timeout" that lowers with each tick that a Creep doesn't interact with it.
    - If a Creep interacts with it, the Forget Timeout should be reset
4. Resources should be organized by room name first, and Creeps should only look for resources in their current room
    - If there are no known resources in their current room, they should run a one-time entire-room `Room.lookAtArea` to get an idea of exactly what is in the room.

### Bunching / Harvesting
Bunching around resources for harvesters is a huge problem. I've attempted to solve this by having harvesters become scavengers, but this isn't ideal. It might be better if I kept the number of Creeps in a room minimized, but the idea isn't to minimize the number of creeps, but to maximize their potential. I.E. More creeps should be _better_ but only if we can make them _useful_.

#### Some ideas
1. I need to learn to use `PathFinder.search` which will give me the path, but more importantly it will tell me the _cost_ of that path, and whether or not that path is _incomplete_
    - More than just what it returns, there are options that can be supplied to this method that let us have more fine-grain control over the path calculation.
2. The use of containers and storage should happen early on
3. `Room.lookAtArea` will also return terrain types. We can use this to automatically define locations around sources to put containers and storage boxes
    - We want to both do this programmatically, and have them near the sources, so we can harvest quicker.
4. `Room.lookAtArea` could also be the perfect way to fix Bunching.
    - Once we have the position of the SOURCES in a room, we can do a `Room.lookAtArea` for the area around the source. Then we can spawn 1 Harvester for each non-wall terrain around the source
    - The harvester can be given the position of the source, so it never has to do a find

### Fine Tuning of Roles
The Screeps tutorial details some pretty basic roles: Harvester, Builder, etc. That's fine, but we quickly find that we are reaching the limits of those defined roles. For that reason, new roles should be thought of. I do not currently know what those roles should be, but I feel they need to be organized by stage of game, and directly related to resource availability. Given the limits of the early and mid-game, Roles really need to be focused on what is available, and heavily based on the resources available at hand.

#### Some notes / ideas
1. Each room is it's own game-stage. We are able to carry resources between rooms, but a Spawn in room A cannot use the energy stored in room B to build larger Creeps.
    - We should figure this into the strategy, building more capable builders once we reach the expansion stage, and focusing on growing storage capacity and Controller level.

#### Role Definitions
##### Civilian
- Harvester
- Hauler
- Builder

##### Military
- Infantry
- Artillery
- Medic
- General
- Scout

## BODYPART COSTS
- MOVE (50)
- WORK (100)
- ATTACK (80)
- CARRY (50)
- HEAL (250)
- RANGED_ATTACK (150)
- TOUGH (10)
- CLAIM (600)