<template>
  <div id="app" ref="app">
    <keep-alive include="Home">
      <router-view />
    </keep-alive>

    <User />
  </div>
</template>
<script>
import User from "@/components/user";
export default {
  components: {
    User,
  },
  data() {
    return {
      iconName: [
        "tangguo",
        "tangguo1",
        "tangguo2",
        "tangguo3",
        "tangguo4",
        "tangguo5",
        "tangguo6",
        "tangguo7",
      ],
    };
  },
  mounted() {
    this.snow1();
    // document.addEventListener("click", (e) => {
    //   console.log(e.target);
    // });
  },
  methods: {
    snow() {
      //  1、定义一片雪花模板
      let flake = document.createElement("div");
      // 雪花字符 ❄❉❅❆✻✼❇❈❊✥✺
      // flake.innerHTML =
      //   '<img class="flower1" style="width:58px;height:80px;" src="flower.png" alt="" />';
      flake.innerHTML = `❄`;
      // flake.innerHTML = ` <i
      //   class="iconfont icon-component icon-tangguo4"
      // />`;
      flake.style.cssText = "position:absolute;";

      //定义生成一片雪花的毫秒数
      let millisec = 1000;

      //获取页面的高度 相当于雪花下落结束时Y轴的位置
      let documentHieght =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      console.log("documentHieght: ", documentHieght);

      //获取页面的宽度，利用这个数来算出，雪花开始时left的值
      let documentWidth =
        document.body.clientWidth || document.documentElement.clientWidth;

      //2、设置第一个定时器，周期性定时器，每隔一段时间（millisec）生成一片雪花；
      setInterval(function () {
        //页面加载之后，定时器就开始工作
        //随机生成雪花下落 开始 时left的值，相当于开始时X轴的位置
        let startLeft = Math.random() * documentWidth;

        //随机生成雪花下落 结束 时left的值，相当于结束时X轴的位置
        let endLeft = Math.random() * documentWidth;

        // 随机生成雪花大小;
        let flakeSize = 20 + 20 * Math.random(); // 5 - 7

        // 随机生成雪花落下的速度
        // let speed = 0.1 + 5 * Math.random(); // 0.1 - 0.2
        let speed = 0.12 + 0.1 * Math.random(); // 0.1 - 0.2

        //随机生成雪花下落持续时间
        // let durationTime = 40000 + 7000 * Math.random(); // 40000 - 40700
        let durationTime = documentHieght / speed; // 27500 - 55000

        //随机生成雪花下落 开始 时的透明度
        let startOpacity = 0.7 + 0.3 * Math.random(); // 0.7 - 1

        //随机生成雪花下落 结束 时的透明度
        let endOpacity = 0.2 + 0.2 * Math.random();

        // 随机生成scale
        let scale = Math.floor(Math.random() * 5);
        scale = (10 - scale) / 10; //生成0.5 ~ 1之间的一个随机数，即为当前花瓣的缩放尺度

        //克隆一个雪花模板
        let cloneFlake = flake.cloneNode(true);

        //第一次修改样式，定义克隆出来的雪花的样式
        // transform: scale(${scale}),
        cloneFlake.style.cssText += `
                        left: ${startLeft}px;
                        opacity: ${startOpacity};
                        
                        font-size:${flakeSize}px
                        top:-100px;
                        transition:${durationTime}ms;
                    `;

        //拼接到页面中
        document.body.appendChild(cloneFlake);

        // console.log(document.body.children.length);
        //设置第二个定时器，一次性定时器，
        //当第一个定时器生成雪花，并在页面上渲染出来后，修改雪花的样式，让雪花动起来；
        setTimeout(function () {
          //第二次修改样式
          cloneFlake.style.cssText += `
                                left: ${endLeft}px;
                                top:${documentHieght}px;
                                opacity:${endOpacity};
                            `;

          //4、设置第三个定时器，当雪花落下后，删除雪花。
          setTimeout(function () {
            cloneFlake.remove();
          }, durationTime);
        }, 0);
      }, millisec);
    },
    snow1() {
      //  1、定义一片雪花模板
      var flake = document.createElement("div");
      // 雪花字符 ❄❉❅❆✻✼❇❈❊✥✺

      //定义生成一片雪花的毫秒数
      var millisec = 300;
      //2、设置第一个定时器，周期性定时器，每隔一段时间（millisec）生成一片雪花；
      setInterval(() => {
        // console.log("body.child", document.body.children.length);
        //获取页面的高度 相当于雪花下落结束时Y轴的位置
        let documentHieght =
          document.documentElement.scrollHeight || document.body.scrollHeight;
        // console.log("documentHieght: ", documentHieght);

        //获取页面的宽度，利用这个数来算出，雪花开始时left的值
        let documentWidth =
          document.body.clientWidth || document.documentElement.clientWidth;
        //页面加载之后，定时器就开始工作
        //随机生成雪花下落 开始 时left的值，相当于开始时X轴的位置
        var startLeft = Math.random() * documentWidth;

        //随机生成雪花下落 结束 时left的值，相当于结束时X轴的位置
        var endLeft = Math.random() * documentWidth;

        //随机生成雪花大小
        var flakeSize = 50 + 20 * Math.random();

        //随机生成雪花下落持续时间
        // var durationTime = 4000 + 7000 * Math.random();

        // 随机生成雪花落下的速度
        // let speed = 0.1 + 5 * Math.random(); // 0.1 - 0.2
        let speed = 0.11 + 0.1 * Math.random(); // 0.1 - 0.2

        //随机生成雪花下落持续时间
        // let durationTime = 40000 + 7000 * Math.random(); // 40000 - 40700
        let durationTime = documentHieght / speed; // 27500 - 55000

        //随机生成雪花下落 开始 时的透明度
        var startOpacity = 0.7 + 0.3 * Math.random();

        //随机生成雪花下落 结束 时的透明度
        var endOpacity = 0.2 + 0.2 * Math.random();

        let iconIndex = Math.floor(Math.random() * (11 - 1));
        // console.log("iconIndex: ", iconIndex);
        let iconName = this.iconName[iconIndex];
        // console.log("iconName: ", iconName);

        // flake.innerHTML = ` <i
        //   class="iconfont icon-component icon-${iconName}"
        // />`;

        flake.innerHTML = `<img src="/candy/tangguo${iconIndex}.png" style="width:20px;height:20px;" alt="">`;

        // flake.innerHTML = "❆";
        flake.style.cssText =
          "position:absolute;color:#fff;z-index:1009;width:20px;height:20px;";

        //克隆一个雪花模板
        var cloneFlake = flake.cloneNode(true);

        //第一次修改样式，定义克隆出来的雪花的样式
        cloneFlake.style.cssText += `
                        left: ${startLeft}px;
                        opacity: ${startOpacity};
                        font-size:${flakeSize}px;
                        top:-50px;
                        transition:${durationTime}ms;
                    `;

        //拼接到页面中
        // document.body.appendChild(cloneFlake);
        if (this.$refs.app) {
          this.$refs.app.appendChild(cloneFlake);
        }

        // top:${documentHieght}px;
        //设置第二个定时器，一次性定时器，
        //当第一个定时器生成雪花，并在页面上渲染出来后，修改雪花的样式，让雪花动起来；
        setTimeout(function () {
          //第二次修改样式
          cloneFlake.style.cssText += `
                                left: ${endLeft}px;
                                
                                transform: translateY(${documentHieght}px) rotate(360deg);;
                                opacity:${endOpacity};
                            `;

          //4、设置第三个定时器，当雪花落下后，删除雪花。
          setTimeout(function () {
            cloneFlake.remove();
          }, durationTime);
        }, 0);
      }, millisec);
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
  position: relative;
  // height: 100%;
  // overflow: hidden;
  overflow-x: hidden;
  overflow-y: hidden;
}
</style>
