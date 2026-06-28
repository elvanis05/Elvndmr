import sys
import subprocess

# Ensure qrcode package is installed
try:
    import qrcode
except ImportError:
    print("Installing qrcode package...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "qrcode[pil]"])
    import qrcode

def generate():
    url = "https://elvndmr.vercel.app/"
    
    # Configure QR code parameters
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,  # High error correction to allow scanning even if slightly damaged/small
        box_size=15,                                         # Large box size for high resolution (good for print CVs)
        border=4,                                            # Standard border size
    )
    qr.add_data(url)
    qr.make(fit=True)

    # Generate a classic high-contrast black & white QR code (safest for printing on CVs)
    img = qr.make_image(fill_color="black", back_color="white")
    
    output_path = "public/portfolio_qr.png"
    img.save(output_path)
    print(f"QR code successfully saved to: {output_path}")

if __name__ == "__main__":
    generate()
