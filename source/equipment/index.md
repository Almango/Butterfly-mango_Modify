---
title: 🎒我的装备
date: 2024-11-16 10:20:54
aside: false
type: equipment
---





<style>
  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 10px;
  }
  .box {
    flex: 1;
    min-width: 180px; /* 最小宽度，可以根据实际情况调整 */
    margin: 10px;
    height: auto;
    overflow: hidden;
    border-radius:12px;
    -webkit-transition: all 0.28s ease;
  }
  
  .box:hover{
    box-shadow: 0px 7px 30px 0px rgba(100, 100, 111, 0.2) ;
  }
  .only-img {
    width: auto;
    height: 200px;
    display: block;
    border-radius: 0;
  }
  #beizhu{
    font-size: 12px;
    margin-top: -17px;
    font-weight: normal;
    color: #7e7e7e;
  }
  .description {
    padding: 0px 0px 15px 15px
  }
  @media (max-width: 768px) {
    .box {
      flex-basis: 100%; /* 在小屏幕上，每个盒子占满整个宽度 */
    }
  }
</style>


<div class="container">
  <div class="box">
    <img src="https://shopstatic.vivo.com.cn/vivoshop/commodity/43/10009543_1713769003117_750x750.png.webp" alt="图片项目1">
    <div class="description">
      <h3>IQOO Z9</h3>
      <h4 id="beizhu">12G / 256GB</h4>
      <p>6000mAh电池|第三代骁龙 7|144Hz 防频闪护眼屏</p>
    </div>
  </div>
  <div class="box">
    <img src="/img/other/p15.png" alt="图片2">
    <div class="description">
      <h3>Colorful P15</h3>
      <h4 id="beizhu">i5-12450H / RTX-4050</h4>
      <p>搭载4050和十二代处理器，具有较高的性能。</p>
    </div>
  </div>
  <div class="box">
    <img src="/img/other/k87pro.png" alt="图片3">
    <div class="description">
      <h3>凌豹 K87 Pro</h3>
      <h4 id="beizhu">三模 / 热插拔</h4>
      <p>三模Gasket热插拔机械键盘，二次元主题配色...</p>
    </div>
  </div>
  <div class="box">
    <img src="/img/other/VH300S.jpg" alt="图片3">
    <div class="description">
      <h3>Repoo VH300S</h3>
      <h4 id="beizhu">Unreal7.1 / 40mm</h4>
      <p>虚拟7.1声道音效，40mm发声单元...
</p>
    </div>
  </div>
</div>