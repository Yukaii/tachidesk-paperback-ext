<!-- ## Warning: Project is not being maintained!
**The original maintainer doesn't own the device to maintain this repo anymore thus this repo is archived, contact us on [Suwayomi discord](https://discord.gg/DDZdqZWaHA) if you want become a maintainer ^^** -->

# Tachidesk Paperback Extension
<img src="https://user-images.githubusercontent.com/47613715/230618874-1d8bef58-382a-483e-9a4d-377714648965.png" alt="drawing" width="200"/>

This  [Paperback](https://paperback.moe/) extension lets you use Tachiyomi extensions on iOS!
[Tachidesk](https://github.com/Suwayomi/Tachidesk-Server) is a rewrite of [Tachiyomi](https://tachiyomi.org/) for the Desktop, this extensions queries a  Tachidesk instance to retrieve content.

## Notice
<b>Since iOS 18, Suwayomi-Server MUST be served through HTTPS.</b>
<b>If your Tachidesk server is behind Cloudflare Zero Trust, enable the Cloudflare Access settings and enter the service token client ID and client secret.</b>

## Setup
-   Setup a Tachidesk server by following this [guide](https://github.com/Suwayomi/Tachidesk-Server#downloading-and-running-the-app).
- Make sure the instance is available through the browser by connecting to the server ip:port (usually runs on port 4567)
- Head to Tachidesk extensions page and install your favorite extensions.
- Now install the this extension on your iOS device by clicking [here](https://suwayomi.github.io/tachidesk-paperback-ext/)
- On Paperback head to Tachidesk extension settings and set the server ip:port (ex: http://192.168.1.10:4567)
- All set! you can now enjoy Tachiyomi extensions on iOS

## Local iteration
- Copy `.env.example` to `.env`.
- Set `TACHIDESK_SERVER_URL` to the server you want local `bundle`, `serve`, and `test` runs to target.
- If the server is behind Cloudflare Zero Trust, set `TACHIDESK_CLOUDFLARE_ACCESS_CLIENT_ID` and `TACHIDESK_CLOUDFLARE_ACCESS_CLIENT_SECRET`.
- `npm run bundle`, `npm run serve`, and `npm test` load `.env` automatically for local runs.

### How to report a Bug
1) Open an Issue [here](https://github.com/Suwayomi/tachidesk-paperback-ext/issues/new) on Github, describe in details the error and how to reproduce it and attach a log exported from paperback (preferred way).
2) You can message me on Discord at Alles#8932
3) You can message me on [Telegram](https://t.me/Alz_8bit) 

##### Credits
- [AlexZorzi](https://github.com/AlexZorzi) repo author
- [ofelizestevez](https://github.com/ofelizestevez) for the active help on this repo and for the 0.8 upgrade
- [xOnlyFadi](https://github.com/xOnlyFadi) for the active help on this repo
- [TheNetsky](https://github.com/TheNetsky) for the technical help
- Paperback Team for the awesome platform
- Tachidesk Team for the fantastic API
- Tachiyomi Team and Community for the content sources
