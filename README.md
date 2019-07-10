# Friends-cp
Disney's friends list for Timeline

# Setup

Make sure you have **Timeline v7.6+**, and the following dependencies. All set, yoou are ready to go.

**Important:** If you want the **Server jumping to friends** to work, you will need **JumpLine** (Timeline Server Jumping) dependency. You can get it from our docs here: [Docs > Intoduction > Mediaserver > JumpLine](https://times-0.github.io/docs/mediaserver.html#ServerJump)

## play page
All u have to setup is use the given play page (if you already don't use the disney' play page), if using icer.ink media server it already comes with this, so you can skip that step.

To use this play page, extract contents into `play` folder to your `play.domain.com` folder.

## mediaserver client
This one is important and **mandatory**. Put the swf file `disney-friends.swf` in `media1 > play > v2 > client` to your mediaserver client folder, and update the same in `dependencies.json` in the same folder:

Find
```json
{
  "id": "rooms_common",
  "title": "Rooms Common"
},
```
below that add this
```json
{
  "id": "disney-friends",
  "title": "Timeline friend extension"
}
```

you are done. Clear cache and enjoy :~)
