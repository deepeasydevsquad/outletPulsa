function daftar_transaksi_index(path, url) {
  var tb = tables({
    width: [10, 20, 10, 20, 10, 10, 10, 10],
    columns: [
      { title: "KODE", center: true },
      { title: "INFO PRODUK", center: true },
      { title: "NOMOR TUJUAN", center: true },
      { title: "KET", center: true },
      { title: "HARGA", center: true },
      { title: "SERVER", center: true },
      { title: "STATUS", center: true },
      // { title: "DateTimes", center: true },
      { title: "Aksi", center: true },
    ],
    tools:
      search_btn({
        placeholder: "KODE TRANSAKSI",
        width: 250,
        onclick: `onClick="${path}_start('${path}', '${url}')"`,
        path: path,
      }) +
      selectFN({
        name_id: "status_transaksi",
        option: [
          { id: "semua", value: "Semua Status" },
          { id: "sukses", value: "Sukses" },
          { id: "proses", value: "Proses" },
          { id: "gagal", value: "Gagal" },
        ],
        class: "float-right mt-1 mr-2",
        att: `style="display: inline-block;width: 120px;"`,
      }),
    path: path,
    not_found_label: "Daftar Transaksi Tidak Ditemukan",
  });

  return tb;
}
