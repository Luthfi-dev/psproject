function Currency(){
  this.rupiah = (nominal, decimalCheck = false)=>{
    var bilangan=nominal ? nominal.toString() : '0';
    var number_string = bilangan.replace(/[^,\d]/g, '').toString(),
      split   = number_string.split(','),
      sisa    = split[0].length % 3,
      rupiah  = split[0].substr(0, sisa),
      ribuan  = split[0].substr(sisa).match(/\d{1,3}/gi);
        
    if (ribuan) {
      const separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }
    if(decimalCheck === true){
      rupiah = (split[1] !== undefined && parseInt(split[1]) > 0 ) ? rupiah + ',' + split[1] : rupiah;
    }
    if(decimalCheck === false){
      rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
    }
    return rupiah
  }

  this.rupiahfromdecimal = (nominal, decimalCheck = false)=>{
    var bilangan = nominal ? nominal.toString() : '0';
    var number_string = bilangan.replace(/[^.\d]/g, '').toString(),
      split   = number_string.split('.'),
      sisa    = split[0].length % 3,
      rupiah  = split[0].substr(0, sisa),
      ribuan  = split[0].substr(sisa).match(/\d{1,3}/gi);
    if (ribuan) {
      const separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }
    if(decimalCheck === true){
      rupiah = (split[1] !== undefined && parseInt(split[1]) > 0 ) ? rupiah + ',' + split[1] : rupiah;
    }
    if(decimalCheck === false){
      rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
    }
    const firstDigit = rupiah?.substr(0, 1)
    const secondDigit = rupiah?.substr(1, 1)
    if(firstDigit === '0' && rupiah.length > 1){
      return secondDigit === ',' ? rupiah : rupiah.substr(1, rupiah.length - 1)
    }
    return bilangan < 0 ? '-' + rupiah : rupiah
  }   
}
module.exports = Currency;