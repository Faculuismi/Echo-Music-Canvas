<p align="center">
  <img src="https://raw.githubusercontent.com/EchoMusicApp/Echo-Music/main/assets/Echo-new.png" alt="Echo Music Logo" height="120"" />
</p>

<h1 align="center">Echo Music Canvas</h1>

Implementing a new way to get beautiful custom canvas background videos for the **Echo Music** app.

This repository acts as the central hub for mapping custom `.mp4` or `.m3u8` background visualizers to specific songs or albums within the Echo Music client.

---

## How to Contribute via the Portal

The easiest way to submit a canvas is through the **[Contribute Portal](https://canvas.echomusic.fun/contribute.html)**. No Git knowledge required — the portal handles forking, branching, and Pull Requests automatically.

### Step 1 — Log In with GitHub
Click **"Log in with GitHub"** to authenticate. This gives the portal permission to create a Pull Request on your behalf, with your GitHub profile credited as the author.

### Step 2 — Choose a Category
Select **Song Canvas** for individual tracks, or **Album Canvas** for album-wide loops.

### Step 3 — Choose Your Canvas Source
You'll see two options:

| Option | When to Use |
|---|---|
| **Upload New Video** | You have a new `.mp4` visualizer to add to the gallery. Drag and drop it, and the portal will validate format, size, duration, and aspect ratio automatically. |
| **Use Existing Canvas** | You want to link an already-uploaded canvas to new songs. Search by song name, artist, or URL and select the canvas from the dropdown. |

### Step 4 — Add Songs
Click **"+ Add Song Entry"** to add one or more songs. Each row needs a **Song Title** and **Artist Name**. You can add as many songs as you need — all of them will point to the same canvas video.

For example, if you're adding an album canvas for "Dawn FM" by The Weeknd, you'd add one row per track on the album, all sharing the same visual.

### Step 5 — Submit
Hit **"Submit to GitHub"**. The portal will automatically fork the repo, create a branch, upload the video (if applicable), update `canvas.json`, and open a Pull Request. You'll get a direct link to view your PR on GitHub.

---

## How to Add a Canvas Manually

If you prefer working with Git directly:

### 1. Upload your Video File
Add your video file into either the `Song/` or `Album/` directory.
* **Format:** `.mp4` or `.m3u8`
* **Example:** `Song/dracula_visualizer.mp4`

### 2. Update `canvas.json`
Open `canvas.json` and add new entries. You can map **multiple songs to the same video URL**:

```json
{
  "items": [
    {
      "song": "Track One",
      "artist": "Artist Name",
      "url": "https://canvas.echomusic.fun/Song/your_video.mp4"
    },
    {
      "song": "Track Two",
      "artist": "Artist Name",
      "url": "https://canvas.echomusic.fun/Song/your_video.mp4"
    }
  ]
}
```

### 3. Commit and Push
Commit your changes, push to your fork, and submit a Pull Request.

> [!IMPORTANT]
> When opening a **Pull Request**, please include the **original song/album link** (YouTube Music, Spotify, or similar) in the description. This helps verify metadata and ensure the canvas matches the correct track.

```bash
git add .
git commit -m "feat: added canvas for Song Title"
git push origin main
```

Once your PR is accepted and merged, it will deploy automatically to Cloudflare Pages.

---

## Technical Requirements and Guidelines

To ensure the integrity of `canvas.json` and prevent layout or loading issues, make sure your visualizer files meet the following guidelines:

* **Aspect Ratio:** `9:16` (Vertical Canvas is required for mobile playback).
* **Format:** `.mp4` or `.m3u8`.
* **File Size:** Max **5MB** for faster buffering and low data usage.
* **Looping:** 3–30 seconds duration with a clean loop transition.

---

## Continuous Integration (CI) and Validation

We run an automated validation workflow on every Pull Request. A maintainer will manually review and merge the Pull Request once all validation checks pass.

### Pull Request Requirements

For a Pull Request to be approved and merged, it must pass the following checks:

1. **Security Filters (File Constraints):**
   * The Pull Request must **only** modify `canvas.json` and files within the `Song/` or `Album/` directories.
   * Any modifications to scripts, GitHub Action workflows, web pages, or stylesheets will flag the PR for manual review.

2. **GitHub Username Ownership Prefix:**
   * Newly added canvas files must be prefixed with your GitHub username (e.g., `username-filename.mp4` or `username-filename.m3u8`).
   * This ownership prefix ensures filename uniqueness, prevents collisions between contributors, and validates upload ownership.
   * Grandfathered legacy files are exempt, but all new contributions must use this ownership prefix format.

3. **Maximum File Size Limit:**
   * All newly added files in a Pull Request must be **equal to or less than 5 MB** to ensure fast loading and prevent build issues on Cloudflare Pages.

4. **Formatting and Integrity:**
   * **JSON Syntax:** The `canvas.json` database must be correctly formatted JSON.
   * **Schema Integrity:** The `song`, `artist`, and `url` fields must be present and match the local directory structure.
   * **No Duplicates:** No two entries in `canvas.json` can map to the exact same song and artist combination.

You can run this validation locally prior to committing:
```bash
node scripts/validate_canvas.js
```

---

## Community and Support

Need help or want to join the Echo Music community?

* **Discord Community:** [Join our Discord](https://discord.com/invite/EcfV3AxH5c)
* **Telegram Channel:** [Join our Telegram](https://t.me/EchoMusicApp)
* **Issues:** If you encounter any bugs, please [open a GitHub Issue](https://github.com/EchoMusicApp/Echo-Music-Canvas/issues).

---

## Credits and Fork Origin

* **Fork Origin:** This project is a fork of [vivimusicanvas](https://github.com/vivizzz007/vivimusicanvas) developed by [vivizzz007](https://github.com/vivizzz007).

---

## License

This project is licensed under the **GNU General Public License v3.0**. See the [LICENSE](LICENSE) file for details.
