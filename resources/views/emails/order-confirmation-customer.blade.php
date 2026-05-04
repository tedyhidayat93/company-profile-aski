<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
    <style>
        body {
            font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
            background: #f3f4f6;
            margin: 0;
            padding: 20px;
            color: #111827;
        }

        .container {
            max-width: 560px;
            margin: auto;
            background: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            border: 1px solid #e5e7eb;
        }

        .header {
            padding: 24px;
            text-align: center;
            border-bottom: 1px solid #e5e7eb;
        }

        .header img {
            max-height: 50px;
            margin-bottom: 10px;
        }

        .header h1 {
            margin: 0;
            font-size: 20px;
        }

        .header p {
            margin: 4px 0 0;
            color: #6b7280;
            font-size: 14px;
        }

        .content {
            padding: 24px;
        }

        .badge-success {
            background: #ecfdf5;
            color: #065f46;
            padding: 12px;
            border-radius: 6px;
            text-align: center;
            font-weight: 600;
            margin-bottom: 20px;
        }

        .section {
            margin-bottom: 20px;
        }

        .section h3 {
            font-size: 14px;
            margin-bottom: 10px;
            color: #6b7280;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .row {
            display: flex;
            justify-content: space-between;
            padding: 6px 0;
            font-size: 14px;
        }

        .row span:first-child {
            color: #6b7280;
        }

        .total {
            text-align: center;
            padding: 16px;
            border-radius: 8px;
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            margin-top: 20px;
        }

        .total strong {
            display: block;
            font-size: 22px;
            margin-top: 6px;
        }

        .contact {
            font-size: 14px;
            color: #374151;
            line-height: 1.5;
        }

        .steps {
            font-size: 14px;
            color: #374151;
            padding-left: 18px;
        }

        .btn {
            display: block;
            text-align: center;
            background: #111827;
            color: white;
            padding: 12px;
            border-radius: 6px;
            text-decoration: none;
            margin-top: 20px;
            font-size: 14px;
        }

        .footer {
            text-align: center;
            font-size: 12px;
            color: #9ca3af;
            padding: 16px;
            border-top: 1px solid #e5e7eb;
        }
    </style>
</head>
<body>

<div class="container">

    <div class="header">
        @if(\App\Models\Configuration::getValue('site_logo'))
            <img src="{{ asset('/storage/' . \App\Models\Configuration::getValue('site_logo')) }}" alt="Logo">
        @endif
        <h1>Konfirmasi Pesanan</h1>
        <p>Pesanan Anda telah kami terima</p>
    </div>

    <div class="content">

        <div class="badge-success">
            Pesanan berhasil dibuat
        </div>

        <div class="section">
            <div class="row">
                <span>No. Pesanan</span>
                <span>#{{ $orderNumber }}</span>
            </div>
            <div class="row">
                <span>Tanggal</span>
                <span>{{ $createdAt }}</span>
            </div>
        </div>

        <div class="section">
            <h3>Pelanggan</h3>
            <div class="row">
                <span>Perusahaan</span>
                <span>{{ $companyName }}</span>
            </div>
            <div class="row">
                <span>PIC</span>
                <span>{{ $customerName }}</span>
            </div>
        </div>

        <div class="section">
            <h3>Produk</h3>
            <div class="row">
                <span>Nama</span>
                <span>
                    @if($productSlug)
                        <a href="{{ url('/catalog/' . $productSlug) }}" style="color: #111827; text-decoration: none;">{{ $productName }}</a>
                    @else
                        {{ $productName }}
                    @endif
                </span>
            </div>
            <div class="row">
                <span>Jumlah</span>
                <span>{{ $quantity }} unit</span>
            </div>
        </div>

        <div class="total">
            Total Estimasi
            <strong>Rp {{ $totalPrice }}</strong>
        </div>

        <div class="section contact">
            <p><strong>Butuh bantuan?</strong></p>
            <p>Email: {{ $contactEmail }}</p>
            <p>Telp: {{ $contactPhone }}</p>
        </div>

        <div class="section">
            <h3>Langkah Berikutnya</h3>
            <ol class="steps">
                <li>Pesanan Anda akan kami verifikasi dalam waktu maksimal 1x24 jam</li>
                <li>Tim kami akan menghubungi Anda untuk konfirmasi detail</li>
                <li>Informasi pembayaran dan pengiriman akan kami sampaikan selanjutnya</li>
            </ol>
        </div>

        <a href="https://wa.me/{{ \App\Models\Configuration::getValue('contact_whatsapp') }}" class="btn">
            Hubungi via WhatsApp
        </a>

    </div>

    <div class="footer">
        © {{ date('Y') }} {{ \App\Models\Configuration::getValue('site_name', 'Company') }}  
        <br>Email otomatis, mohon tidak dibalas
    </div>

</div>

</body>
</html>