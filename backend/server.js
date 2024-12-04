const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql');

const app = express();
const port = 3030;

// SQL Server Configuration
const configDBTest1 = {
    user: 'sa',
    password: '1234',
    server: 'ISCDTS-OPTDMT',
    database: 'DBTest1',
    options: {
        encrypt: true,
        enableArithAbort: true,
        trustServerCertificate: true,
        instanceName: 'SAKTISVR'
    },
};

const configDBReport = {
  user: 'sa',
  password: '1234',
  server: 'ISCDTS-OPTDMT',
  database: 'DB_report',
  options: {
      encrypt: true,
      enableArithAbort: true,
      trustServerCertificate: true,
      instanceName: 'SAKTISVR'
  },
};

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Create a single connection pool for each database
let poolTest1, poolReport;

async function connectToDatabases() {
    try {
        poolTest1 = await sql.connect(configDBTest1);
        poolReport = await sql.connect(configDBReport);
        console.log('Connected to databases');
    } catch (err) {
        console.error('Database connection failed:', err);
    }
}

// Routes for DBTest1
app.get('/userss', async (req, res) => {
    try {
        const result = await poolTest1.request().query("SELECT * FROM [DBTest1].[dbo].[BRI]");
        res.send(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving users');
    }
});

app.get('/userssProd', async (req, res) => {
  try {
      const result = await poolTest1.request().query("SELECT * FROM [DBTest1].[dbo].[BRI_ProductionFix]");
      res.send(result.recordset);
  } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving users');
  }
});

app.get('/fields', async (req, res) => {
    try {
        const result = await poolTest1.request().query("SELECT * FROM [DBTest1].[dbo].[BRI]");
        res.send(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving fields');
    }
});

app.get('/fieldsProd', async (req, res) => {
  try {
      const result = await poolReport.request().query("SELECT * FROM [DB_report].[dbo].[BRI_ProductionFix]");
      res.send(result.recordset);
  } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving fields');
  }
});

app.get('/fieldsProdHrd', async (req, res) => {
  try {
      const result = await poolReport.request().query("select * from [DB_report].[dbo].[HRD]");
      res.send(result.recordset);
  } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving fields');
  }
});

app.get('/fieldsProdBrisim', async (req, res) => {
  try {
      const result = await poolReport.request().query("SELECT * FROM [DB_report].[dbo].[BRISIM]");
      res.send(result.recordset);
  } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving fields');
  }
});



app.get('/plainText', async (req, res) => {
    try {
        const result = await poolTest1.request().query("SELECT * FROM [DBTest1].[dbo].[BRI]");
        res.send(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving users');
    }
});

app.get('/Encryption', async (req, res) => {
    try {
        const result = await poolTest1.request().query("SELECT Voltage.dbo.FPECryptIdProtect(ID,'number') AS ID, Voltage.dbo.FPECryptIdProtect(nomor_npwp,'number') AS nomor_npwp, Voltage.dbo.FPECryptIdProtect(nasabah,'alpha') AS nasabah, Voltage.dbo.FPECryptIdProtect(nomor_rekening,'number') AS nomor_rekening, Voltage.dbo.FPECryptIdProtect(jenis_rekening,'alpha') AS jenis_rekening, Voltage.dbo.FPECryptIdProtect(saldo,'alpha') AS saldo, Voltage.dbo.FPECryptIdProtect(tgl_buka_rekening,'alpha') AS tgl_buka_rekening, Voltage.dbo.FPECryptIdProtect(alamat,'alpha') AS alamat,Voltage.dbo.FPECryptIdProtect(no_telp,'number') as no_telp, Voltage.dbo.FPECryptIdProtect(email,'alpha') AS email, Voltage.dbo.FPECryptIdProtect(tgl_lahir,'alpha') AS tgl_lahir, Voltage.dbo.FPECryptIdProtect(jenis_kelamin,'alpha') AS jenis_kelamin, Voltage.dbo.FPECryptIdProtect(status_kawin,'alpha') AS status_kawin, Voltage.dbo.FPECryptIdProtect(pekerjaan,'alpha') AS pekerjaan, Voltage.dbo.FPECryptIdProtect(penghasilan_bulanan,'alpha') AS penghasilan_bulanan, Voltage.dbo.FPECryptIdProtect(jenis_cc,'alpha') AS jenis_cc, Voltage.dbo.FPECryptIdProtect(limit_cc,'alpha') AS limit_cc, Voltage.dbo.FPECryptIdProtect(status_cc,'alpha') AS status_cc, Voltage.dbo.FPECryptIdProtect(tgl_terbit_cc,'alpha') AS tgl_terbit_cc, Voltage.dbo.FPECryptIdProtect(tgl_kdl_cc,'alpha') AS tgl_kdl_cc, Voltage.dbo.FPECryptIdProtect(status_pinjaman,'alpha') AS status_pinjaman, Voltage.dbo.FPECryptIdProtect(jml_pinjaman,'alpha') AS jml_pinjaman, Voltage.dbo.FPECryptIdProtect(tgl_pengajuan_pinjaman,'alpha') AS tgl_pengajuan_pinjaman, Voltage.dbo.FPECryptIdProtect(nama_ibu,'alpha') AS nama_ibu, Voltage.dbo.FPECryptIdProtect(tgl_pelunasan_pinjaman,'alpha') AS tgl_pelunasan_pinjaman, Voltage.dbo.FPECryptIdProtect(skor_kredit,'alpha') AS skor_kredit, Voltage.dbo.FPECryptIdProtect(tipe_produk_tabungan,'alpha') AS tipe_produk_tabungan, Voltage.dbo.FPECryptIdProtect(status_aktif_rek,'alpha') AS status_aktif_rek, Voltage.dbo.FPECryptIdProtect(jml_transaksi_bulanan,'alpha') AS jml_transaksi_bulanan, Voltage.dbo.FPECryptIdProtect(rtrt_saldo_bulanan,'alpha') AS rtrt_saldo_bulanan, Voltage.dbo.FPECryptIdProtect(kantor_cabang,'alpha') AS kantor_cabang FROM [DBTest1].[dbo].[BRI]");
        res.send(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving users');
    }
});

app.get('/masking', async (req, res) => {
    try {
        const result = await poolTest1.request().query("SELECT Voltage.dbo.masking_nama(nasabah) AS nasabah, Voltage.dbo.masking_rekening(nomor_rekening,6,4) AS nomor_rekening, Voltage.dbo.fullmasking(jenis_rekening) AS jenis_rekening, Voltage.dbo.fullmasking(saldo) AS saldo, Voltage.dbo.fullmasking(CONVERT(VARCHAR, tgl_buka_rekening, 120)) AS tgl_buka_rekening, Voltage.dbo.fullmasking(alamat) AS alamat, Voltage.dbo.fullmasking(no_telp) AS no_telp, Voltage.dbo.fullmasking(email) AS email, Voltage.dbo.fullmasking(CONVERT(VARCHAR, tgl_lahir, 120)) AS tgl_lahir, Voltage.dbo.fullmasking(tgl_lahir) AS tgl_lahir_tanpa_convert, Voltage.dbo.fullmasking(jenis_kelamin) AS jenis_kelamin, Voltage.dbo.fullmasking(status_kawin) AS status_kawin, Voltage.dbo.fullmasking(pekerjaan) AS pekerjaan, Voltage.dbo.fullmasking(penghasilan_bulanan) AS penghasilan_bulanan, Voltage.dbo.fullmasking(jenis_cc) AS jenis_cc, Voltage.dbo.fullmasking(limit_cc) AS limit_cc, Voltage.dbo.fullmasking(status_cc) AS status_cc, Voltage.dbo.fullmasking(CONVERT(VARCHAR, tgl_terbit_cc, 120)) AS tgl_terbit_cc, Voltage.dbo.fullmasking(CONVERT(VARCHAR, tgl_kdl_cc, 120)) AS tgl_kdl_cc, Voltage.dbo.fullmasking(status_pinjaman) AS status_pinjaman, Voltage.dbo.fullmasking(jml_pinjaman) AS jml_pinjaman, Voltage.dbo.fullmasking(CONVERT(VARCHAR, tgl_pengajuan_pinjaman, 120)) AS tgl_pengajuan_pinjaman, Voltage.dbo.fullmasking(CONVERT(VARCHAR, tgl_pelunasan_pinjaman, 120)) AS tgl_pelunasan_pinjaman, Voltage.dbo.fullmasking(skor_kredit) AS skor_kredit, Voltage.dbo.fullmasking(nomor_npwp) AS nomor_npwp, Voltage.dbo.fullmasking(nama_ibu) AS nama_ibu, Voltage.dbo.fullmasking(tipe_produk_tabungan) AS tipe_produk_tabungan, Voltage.dbo.fullmasking(status_aktif_rek) AS status_aktif_rek, Voltage.dbo.fullmasking(jml_transaksi_bulanan) AS jml_transaksi_bulanan, Voltage.dbo.fullmasking(rtrt_saldo_bulanan) AS rtrt_saldo_bulanan, Voltage.dbo.fullmasking(kantor_cabang) AS kantor_cabang, Voltage.dbo.fullmasking(ID) AS ID FROM [DBTest1].[dbo].[BRI]");
        res.send(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving users');
    }
});

// Routes for DB_report
app.get('/plainTextProd', async (req, res) => {
    try {
        const result = await poolReport.request().query("SELECT * FROM [DB_report].[dbo].[BRI_ProductionFix]");
        res.send(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving report data');
    }
});

app.get('/EncryptionProd', async (req, res) => {
    try {
        const result = await poolReport.request().query("SELECT Voltage.dbo.FPECryptIdProtect(ID,'number') AS ID, Voltage.dbo.FPECryptIdProtect(nomor_npwp,'number') AS nomor_npwp, Voltage.dbo.FPECryptIdProtect(nasabah,'alpha') AS nasabah, Voltage.dbo.FPECryptIdProtect(nomor_rekening,'number') AS nomor_rekening, Voltage.dbo.FPECryptIdProtect(jenis_rekening,'alpha') AS jenis_rekening, Voltage.dbo.FPECryptIdProtect(saldo,'alpha') AS saldo, Voltage.dbo.FPECryptIdProtect(tgl_buka_rekening,'alpha') AS tgl_buka_rekening, Voltage.dbo.FPECryptIdProtect(alamat,'alpha') AS alamat,Voltage.dbo.FPECryptIdProtect(no_telp,'number') as no_telp, Voltage.dbo.FPECryptIdProtect(email,'alpha') AS email, Voltage.dbo.FPECryptIdProtect(tgl_lahir,'alpha') AS tgl_lahir, Voltage.dbo.FPECryptIdProtect(jenis_kelamin,'alpha') AS jenis_kelamin, Voltage.dbo.FPECryptIdProtect(status_kawin,'alpha') AS status_kawin, Voltage.dbo.FPECryptIdProtect(pekerjaan,'alpha') AS pekerjaan, Voltage.dbo.FPECryptIdProtect(penghasilan_bulanan,'alpha') AS penghasilan_bulanan, Voltage.dbo.FPECryptIdProtect(jenis_cc,'alpha') AS jenis_cc, Voltage.dbo.FPECryptIdProtect(limit_cc,'alpha') AS limit_cc, Voltage.dbo.FPECryptIdProtect(status_cc,'alpha') AS status_cc, Voltage.dbo.FPECryptIdProtect(tgl_terbit_cc,'alpha') AS tgl_terbit_cc, Voltage.dbo.FPECryptIdProtect(tgl_kdl_cc,'alpha') AS tgl_kdl_cc, Voltage.dbo.FPECryptIdProtect(status_pinjaman,'alpha') AS status_pinjaman, Voltage.dbo.FPECryptIdProtect(jml_pinjaman,'alpha') AS jml_pinjaman, Voltage.dbo.FPECryptIdProtect(tgl_pengajuan_pinjaman,'alpha') AS tgl_pengajuan_pinjaman, Voltage.dbo.FPECryptIdProtect(nama_ibu,'alpha') AS nama_ibu, Voltage.dbo.FPECryptIdProtect(tgl_pelunasan_pinjaman,'alpha') AS tgl_pelunasan_pinjaman, Voltage.dbo.FPECryptIdProtect(skor_kredit,'alpha') AS skor_kredit, Voltage.dbo.FPECryptIdProtect(tipe_produk_tabungan,'alpha') AS tipe_produk_tabungan, Voltage.dbo.FPECryptIdProtect(status_aktif_rek,'alpha') AS status_aktif_rek, Voltage.dbo.FPECryptIdProtect(jml_transaksi_bulanan,'alpha') AS jml_transaksi_bulanan, Voltage.dbo.FPECryptIdProtect(rtrt_saldo_bulanan,'alpha') AS rtrt_saldo_bulanan, Voltage.dbo.FPECryptIdProtect(kantor_cabang,'alpha') AS kantor_cabang FROM [DB_report].[dbo].[BRI_ProductionFix]");
        res.send(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving report data');
    }
});

app.get('/maskingProd', async (req, res) => {
    try {
        const result = await poolReport.request().query("SELECT Voltage.dbo.masking_nama(nasabah) AS nasabah, Voltage.dbo.masking_rekening(nomor_rekening,6,4) AS nomor_rekening, Voltage.dbo.fullmasking(jenis_rekening) AS jenis_rekening, Voltage.dbo.fullmasking(saldo) AS saldo, Voltage.dbo.fullmasking(CONVERT(VARCHAR, tgl_buka_rekening, 120)) AS tgl_buka_rekening, Voltage.dbo.fullmasking(alamat) AS alamat, Voltage.dbo.fullmasking(no_telp) AS no_telp, Voltage.dbo.fullmasking(email) AS email, Voltage.dbo.fullmasking(CONVERT(VARCHAR, tgl_lahir, 120)) AS tgl_lahir, Voltage.dbo.fullmasking(tgl_lahir) AS tgl_lahir_tanpa_convert, Voltage.dbo.fullmasking(jenis_kelamin) AS jenis_kelamin, Voltage.dbo.fullmasking(status_kawin) AS status_kawin, Voltage.dbo.fullmasking(pekerjaan) AS pekerjaan, Voltage.dbo.fullmasking(penghasilan_bulanan) AS penghasilan_bulanan, Voltage.dbo.fullmasking(jenis_cc) AS jenis_cc, Voltage.dbo.fullmasking(limit_cc) AS limit_cc, Voltage.dbo.fullmasking(status_cc) AS status_cc, Voltage.dbo.fullmasking(CONVERT(VARCHAR, tgl_terbit_cc, 120)) AS tgl_terbit_cc, Voltage.dbo.fullmasking(CONVERT(VARCHAR, tgl_kdl_cc, 120)) AS tgl_kdl_cc, Voltage.dbo.fullmasking(status_pinjaman) AS status_pinjaman, Voltage.dbo.fullmasking(jml_pinjaman) AS jml_pinjaman, Voltage.dbo.fullmasking(CONVERT(VARCHAR, tgl_pengajuan_pinjaman, 120)) AS tgl_pengajuan_pinjaman, Voltage.dbo.fullmasking(CONVERT(VARCHAR, tgl_pelunasan_pinjaman, 120)) AS tgl_pelunasan_pinjaman, Voltage.dbo.fullmasking(skor_kredit) AS skor_kredit, Voltage.dbo.fullmasking(nomor_npwp) AS nomor_npwp, Voltage.dbo.fullmasking(nama_ibu) AS nama_ibu, Voltage.dbo.fullmasking(tipe_produk_tabungan) AS tipe_produk_tabungan, Voltage.dbo.fullmasking(status_aktif_rek) AS status_aktif_rek, Voltage.dbo.fullmasking(jml_transaksi_bulanan) AS jml_transaksi_bulanan, Voltage.dbo.fullmasking(rtrt_saldo_bulanan) AS rtrt_saldo_bulanan, Voltage.dbo.fullmasking(kantor_cabang) AS kantor_cabang, Voltage.dbo.fullmasking(ID) AS ID FROM [DB_report].[dbo].[BRI_ProductionFix]");
        res.send(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving masked data from production report');
    }
});

app.get('/plainTextProdHrd', async (req, res) => {
  try {
      const result = await poolReport.request().query("SELECT * FROM [DB_report].[dbo].[HRD]");
      res.send(result.recordset);
  } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving report data');
  }
});

app.get('/EncryptionProdHrd', async (req, res) => {
  try {
      const result = await poolReport.request().query("select Voltage.dbo.FPECryptIDProtect(EmployeeID,'alpha') as EmployeeID,Voltage.dbo.FPECryptIDProtect(Gender,'alpha') as Gender,Voltage.dbo.FPECryptIDProtect(FirstName,'alpha') as FirstName,Voltage.dbo.FPECryptIDProtect(LastName,'alpha') as LastName, Voltage.dbo.FPECryptIDProtect(BirthDate,'alpha') as BirthDate, Voltage.dbo.FPECryptIDProtect(Department,'alpha') as Department, Voltage.dbo.FPECryptIDProtect(Position,'alpha') as Position, Voltage.dbo.FPECryptIDProtect(Salary,'alpha') as Salary from [DB_report].[dbo].[HRD]");
      res.send(result.recordset);
  } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving report data');
  }
});

app.get('/maskingProdHrd', async (req, res) => {
  try {
      const result = await poolReport.request().query("select Voltage.dbo.masking_nama(EmployeeID) AS EmployeeID, Voltage.dbo.masking_nama(FirstName) AS FirstName, Voltage.dbo.masking_nama(LastName) AS LastName, Voltage.dbo.masking_nama(BirthDate) AS BirthDate, Voltage.dbo.masking_nama(Gender) AS Gender, Voltage.dbo.masking_nama(Department) AS Department, Voltage.dbo.masking_nama(Position) AS Position, Voltage.dbo.masking_nama(Salary) AS Salary  FROM [DB_report].[dbo].[HRD]");
      res.send(result.recordset);
  } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving masked data from production report');
  }
});

app.get('/plainTextProdBrisim', async (req, res) => {
  try {
      const result = await poolReport.request().query("SELECT * FROM [DB_report].[dbo].[BRISIM]");
      res.send(result.recordset);
  } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving report data');
  }
});

app.get('/EncryptionProdBrisim', async (req, res) => {
  try {
      const result = await poolReport.request().query("select Voltage.dbo.FPECryptIDProtect(RecordID,'alpha') as RecordID,Voltage.dbo.FPECryptIDProtect(RecordName,'alpha') as RecordName,Voltage.dbo.FPECryptIDProtect(Description,'alpha') as Description,Voltage.dbo.FPECryptIDProtect(CreatedDate,'alpha') as CreatedDate, Voltage.dbo.FPECryptIDProtect(Status,'alpha') as Status, Voltage.dbo.FPECryptIDProtect(ProductName,'alpha') as ProductName, Voltage.dbo.FPECryptIDProtect(Quantity,'alpha') as Quantity, Voltage.dbo.FPECryptIDProtect(PurchaseDate,'alpha') as PurchaseDate,Voltage.dbo.FPECryptIDProtect(UnitPrice,'alpha') as UnitPrice,Voltage.dbo.FPECryptIDProtect(IsActive,'alpha') as IsActive from [DB_report].[dbo].[BRISIM]");
      res.send(result.recordset);
  } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving report data');
  }
});

app.get('/maskingProdBrisim', async (req, res) => {
  try {
      const result = await poolReport.request().query("select Voltage.dbo.masking_nama(RecordID) AS RecordID,Voltage.dbo.masking_nama(RecordName) AS RecordName,Voltage.dbo.masking_nama(Description) AS Description, Voltage.dbo.masking_nama(CreatedDate) AS CreatedDate, Voltage.dbo.masking_nama(Status) AS Status, Voltage.dbo.masking_nama(ProductName) AS ProductName, Voltage.dbo.masking_nama(Quantity) AS Quantity, Voltage.dbo.masking_nama(PurchaseDate) AS PurchaseDate, Voltage.dbo.masking_nama(UnitPrice) AS UnitPrice, Voltage.dbo.masking_nama(IsActive) AS IsActive  FROM [DB_report].[dbo].[BRISIM]");
      res.send(result.recordset);
  } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving masked data from production report');
  }
});

// Start server and connect to databases
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    connectToDatabases();
});
