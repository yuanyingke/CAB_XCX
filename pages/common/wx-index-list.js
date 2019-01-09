var temp = {
  jumpMt(e) {

    let jumpNum = e.currentTarget.dataset.id;
    //console.log(jumpNum)
    this.setData({ jumpNum: jumpNum });
  }
}
export default temp