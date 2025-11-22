# How to use ngrok for Local HTTPS Testing

Project Aletheia uses device sensors (Accelerometer/Gyroscope) which **require a secure context (HTTPS)**. They will not work on `http://localhost` when accessed from your phone.

To test on your mobile device, you need to tunnel your local server to a public HTTPS URL. We recommend **ngrok**.

## 1. Install ngrok

If you haven't installed it yet:

- **Windows**: `winget install ngrok` OR download from [ngrok.com](https://ngrok.com/download)
- **Mac**: `brew install ngrok/ngrok/ngrok`
- **Linux**: `snap install ngrok`

## 2. Sign up & Authenticate

1. Sign up for a free account at [dashboard.ngrok.com](https://dashboard.ngrok.com/signup).
2. Get your Authtoken from the dashboard.
3. Run the command:
   ```bash
   ngrok config add-authtoken YOUR_TOKEN_HERE
   ```

## 3. Start your Local Server

Ensure your Next.js app is running:

```bash
npm run dev
```

_Usually runs on port 3000._

## 4. Start the Tunnel

Open a **new terminal** window and run:

```bash
ngrok http 3000
```

## 5. Test on Mobile

1. Copy the `https://...ngrok-free.app` URL shown in the terminal.
2. Send it to your phone (email, Slack, QR code, etc.).
3. Open it in your mobile browser (Safari on iOS, Chrome on Android).
4. **Important**: You might see a "Visit Site" warning page from ngrok. Click "Visit Site".
5. Allow sensor permissions if prompted.

## Troubleshooting

- **"Invalid Host Header"**: If you see this, try running ngrok with:
  ```bash
  ngrok http 3000 --host-header="localhost:3000"
  ```
- **Permission Denied**: Ensure you are using the **HTTPS** link, not HTTP.
