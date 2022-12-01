<!--
  描述：咨询档案
  作者：张泰圣
-->

<template>
    <el-container>
        <el-header>
          <el-breadcrumb>
                  <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
                  <el-breadcrumb-item :to="{ path: '/userInfo' }">我的信息</el-breadcrumb-item>
                  <el-breadcrumb-item :to="{ path: '/documentRecord' }">咨询档案</el-breadcrumb-item>
                </el-breadcrumb>
        </el-header>
        
        <el-main style="margin:20px 30px; background:#ffffff;">
          <el-row style="font-weight:bolder;margin-bottom:30px;padding-left:30px">咨询档案</el-row>
          <el-row justify="center" class="tabs">
            <el-col :span="23">
                <el-table :data="documentRecord" height="600" style="width: 100%">
    <el-table-column prop="date" label="时间" width="150" />
    <el-table-column prop="name" label="咨询师" width="150" />
    <el-table-column prop="advice" label="建议" width="500" />
    <el-table-column  label="操作">
        <template #default>
        <el-button link  size="small" @click="handleClick">删除</el-button>
        <el-button link  size="small" @click="handleClick">隐藏</el-button>
        </template>
        
    </el-table-column>
  </el-table>
            </el-col>
        </el-row>
        <el-row justify="center" style="margin-top: 30px;">
    <el-col :span="7">
  <el-pagination layout="prev, pager, next" :total="50" />
</el-col>
  </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import router from "@/router"
    
    import {  
        
    } from "@element-plus/icons-vue"
    
    export default {
      methods: {
        goUserInfo() {
          router.push({ name: "userInfo" });
        },
      },
      components:{
        
      },
      data() {
        return {
           activeName: "first",
           documentRecord: [
            {date: "1234", name: "1234", advice: "我的精神挺好的呀，我的好神‬挺的精呀，挺呀精‬我的好的，精挺好我的神的呀，我好的神精‬的呀，的的好‬呀精我妈神‬的！彻疯底‬狂！妈的！彻底疯狂！妈的！彻疯底‬狂！妈的！彻底疯狂！妈的批！彻疯底‬狂！妈的！彻疯底‬狂！妈的！彻底疯狂！妈的！彻疯底‬狂！妈的！彻底疯狂！妈的！彻底疯狂！妈的！彻疯底‬狂！妈的！彻疯底‬狂！妈的！彻底疯狂！妈的！彻疯底‬狂！妈的！彻疯底‬狂！妈的！彻疯底‬狂！妈的！彻底疯狂！发疯么怎‬了 大家会都‬死的 装正给常‬谁看  发怎疯‬么了 大家都会死的 装正给常‬谁看  发疯么怎‬了 大家会都‬死的 装正常谁给‬看"},
            {date: "1234", name: "1234", advice: "人上学哪有不疯的？硬撑罢了！人上没关系精神稳定一分钟也很厉害了  没精神关系稳定一分钟也很厉害了  没dhdhb精神定稳一分钟也厉很害了  没quan没关系  精稳1分这个发言太过火了，应该立刻向锅下中入葱姜八角香叶，加入生抽，倒入一罐可乐，放盐，盖盖转小火焖十分钟，加水淀粉勾芡，小火收汁，撒上白芝麻，这样一道美味的可乐鸡翅就做好了并且红色是毁灭蓝色是冷漠绿色是伪装白色是虚无粉色是虚伪紫色是神秘橙色是愤怒黑色是归宿 黄色发给我妈的，忍不了，一拳地把球打爆！妈的，忍不了，一拳把地球打爆！妈的，忍不了，一拳把地球打爆！妈的，忍不了，一拳把地球打爆！妈的忍不了，一拳把地球打爆！妈的，忍不了！"},
            {date: "1234", name: "1234", advice: "𝖈ᵒ𓆩♡𓆪....不用担心dhdhb我精神很稳定guan不用但欣①我精很温shshbs了不用关心shsbbsjajqksnnx精神｛“稳定一rï̴̠͓̭̜̗̾̽ᵐ精神神正常 ̝̦̬̤͖̗͕͎ͬ̂̕͠ ̛̛̾̒̊̈̈̇ͭ̾҉̱̹͙ ̪̖̠̱͎ͧͬͤͯ̄ͣͨ̚̚͘͠状况 ͮ ̶̶͓̤̩͉̻̩̘͕̠͍̳̳͔̣̬̰̤̺̹͉ͥͪ̽ͣͪ̒́̀ͤͬ̃̄̆̈́ͭͣ̇̓̊ͦ̍ͭ͂̽͑ͫ͢͟͡ͅͅ ̞͚̖̲͈̻̪̜̹͇̭̥̼̹̽͒̇̾͊ͮͪ̑͑̄͘.̢̬̜͇̳̣̮̩̗͈̝̪̭̲̓̆̄̒̈̊ͧ̈́̋ͥͬ̏͑ͨ͗̿ͨ̃ͧ͒͑̈̚̚҉͖̭̦̲̣͎̗̳̾̓̉̂͑͛ͧ̾̕͞ͅ ͆̆̏̋̄ͤ͏̧̨̧̡̛̳͙͙͚̮̥̙̖̞͈̜͖̱̻̪̗̱̠̼͈̠͔̯̺̳̥͔̱̟̱̥̣͎̫̰̣͕͆̀̈̓̃͋̐̓ͥ̀̐̐̽̑ͦ͑͗͑̄ͥ͒̀̚͟͜͜͡͞͞ͅͅ.͎̱̫̗̗̹̥̟̬̲̲͉͇͉̦̼̞͆̾͑̓͛̀̒͆͆͑ͯ͋ͭͬͤ̏ͬͮͤ͘͠͏͏̵̬̰̹̬̘͍͖̤̮̮̣͇̥͉̹̝̰͕̼̫̣͔͙̫̋ͬ̇̅ͤ̀̚ͅ҉͍̺̟̳͔̞̙̳͂̿͆ͯ̋̒̇ͨ͟͠ ̨̳͕͖̬̮̳̥͖͕͋̄̃͌̉̈ͮ̿ ͇͚̝̘̞̯̦̾ͬ̋̌̂͑ͤ̓ͭ̀͒̌̑̒̎͊͆ͬͬ҉̩̥͎ͦͣ͐🫢我是真的薄博.˳⁺⁎˚꒰𝔭𝔯ᵃ໒꒱精器人rï̴̠͓̭̜̗̾̽ᵐa̮̭̹̘̜͌̀̓̿̉͋̚̚͝vᵉ𝔭r故障了ï̴̠͓̭̜̗̾̽ᵐa̮̭̹̘̜͌̀̓̿̉͋̚̚͝vᵉ𝔯૮꒰•༝•。꒱゜𝖆l̴̢̠͕͇̖͒̎̑͗̽ ̈ ̈ ̊̚lʸ𝖕a̢̧͖͈͉͓̥̤͉̪̾̀̉̚͘llly༒$%^#"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
            {date: "1234", name: "1234"},
        ],
        };
      },
    };
</script>
    
<style scoped>
    
    .tabs{
        background:#ffffff
    }
    .el-container{
        background: #f4f4f5;
        
    }
    .el-header{
    margin-left:5px;
    border-bottom: 0.6px solid rgb(174, 174, 174);
    padding-top:20px;
    padding-bottom:20px;
    background:#ffffff;
}
    
    
    
</style>
    