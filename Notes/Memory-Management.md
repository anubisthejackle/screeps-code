Managing Memory efficiently is an extremely important aspect of Screeps, and one that new players often overlook. Each player has a [limited amount of memory available](https://docs.screeps.com/global-objects.html#Memory-object) (2MB), which can quickly become overwhelmed if memory management isn't taken into consideration. There are a few aspects of memory management that a Screeps player needs to consider.

# Data Storage
You are completely able to store entire game objects in Memory. The problem is, game objects are large, and take up a lot of memory. For that reason, it is suggested by Screeps to store just game object IDs in memory, and fetch them upon use. The problem is that there is CPU cost to running `getObjectByID`, the CPU cost is low, but still present. It may be better, instead, to store things as Positions, if all we are doing is checking their position at the time.

# Garbage Collection
Along with Data Storage, there absolutely _must_ be garbage collection. Garbage Collections is defined as cleaning up the stored memory. It is a necessary part of the process, and one that new players often skip. This is important even on local private servers where you have unlimited access to CPU and Memory.

## Methods for Clean Up
When storing data in Memory, we need to determine the type of data that is being stored. I have categorized the available data types as following: Permanent, Long-Lived, and Ephemeral

### Permanent
Permanent structures are those that never disappear. These are resources, generally, and automatically replenish themselves. Permanent structures are always present, but they may not always be accessible. Sources, for instance, are available to you in owned and neutral rooms, while Minerals and Deposits are only available once you are the room owner as they require building structures to gain access to them. Room controllers are a special case which, like sources, are always available to you, but might not be accessible if your [Global Control Level](https://docs.screeps.com/control.html) is below a certain level. These structures can permanently be stored in Memory, as they will never change.

1. Sources
2. Minerals
3. Deposits
4. Room Controllers

### Long-Lived
Long-lived structures are structures that do not decay unless attacked. These would be Walls, Spawns, Towers, etc. These structures can be stored in memory with periodic checks to verify that they still exist.

1. Spawns
2. Walls
3. Towers
4. Extensions
5. Containers
6. Links
7. Nukers
8. Observers
9. Power Spawns
10. Storage

### Ephemeral
Ephemeral structures and items are ones that have a decay as soon as they are placed down. This classification could likely be broken into multiple sections, but each of the things mentioned in this section share the same trait of decaying over time. Ephemeral structures should be stored, but with a decay rate in memory identical to that of their own decay rate. This rate can be upgraded when a Creep repairs the structures, and they can be removed from memory entirely when they either decay fully, or whatever resources they carry (in the case of Dropped Resources and Tombstones) are recovered.

1. Dropped Resources
2. Roads
3. Ramparts
4. Creeps
5. Tombstones