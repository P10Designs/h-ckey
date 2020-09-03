function header(){
  document.querySelector('.header-menu').style = "transform:translateX(316px);";
  document.querySelector('.header-menu-icon').addEventListener('click', () => {
    document.querySelector('.header-menu').style = "transform:translateX(0px);";
    document.querySelector('.header-left').className += " dim";
    document.querySelector('.header-center').className += " dim";
  });
  document.querySelector('.header-menu-svg').addEventListener('click', () => {
    document.querySelector('.header-menu').style = "transform:translateX(316px);";
    document.querySelector('.header-left').className = "header-left";
    document.querySelector('.header-center').className = "header-center";
  });
  logger('info','Header -> Loaded');
}
