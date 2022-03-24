function moneyComma(money) {
  return (money + "").replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

export default moneyComma;
