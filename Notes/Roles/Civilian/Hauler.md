# Hauler
The Hauler's job is to take dropped resources and move them to storage containers. Hauler's are assigned to a specific Source. The Hauler is given a source to cover when it is Spawned, and hovers within a 2 block radius of the Source, which should give the Harvester's a chance to get to the Source and harvest it.

## Levels

### Initial Game
We don't use Haulers in the Initial Game. Instead we use a combined [[Harvester-Hauler|Harvester]]

### Early Game
In the Early Game we will be running slower haulers that can carry a lot of energy. These will cost us 250 each, but they can carry 200 Energy per movement.

- CARRY
- CARRY
- CARRY
- CARRY
- MOVE

### Mid Game
TBD

### Late Game
TBD

### End Game
TBD

## Problems Associated with Haulers
### Bunching Problem
Haulers can add to the Bunching problem by blocking paths for Harvesters around Narrow sources. There is also the problem of dropped resources. If we have haulers that are source-specific, we're losing resources that are dropped from dead Creeps. If we let our Haulers travel, we have the potential to lose even more resources by traveling across the map for 1 resource, while losing resources that are being Harvested.

Possible solution would be to have a Hauler assigned to each Source in a room, with a third that travels around picking up dropped resources. The question would then be whether or not that third hauler earns enough to justify their cost. 

### Expensive
As mentioned above, Haulers can become expensive. A hard look needs to be taken towards their Cost/Benefit. Tracking of Resources Delivered to make sure they are delivering more resources than they are costing us would be a good place to start.

Possibly add into the spawn algorithm this tracking. Creeps should be spawned with the highest number of body parts available but at a level where that cost isn't going to be greater than their value to the Colony.