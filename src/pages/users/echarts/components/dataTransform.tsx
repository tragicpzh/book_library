const generatorData=()=>{
  const data=[
    {
      name:'小说',
      children:[
        {
          name:'三体'
        },
        {
          name:'亮剑'
        },
        {
          name:'哈利波特'
        }
      ]
    },
    {
      name:'科研论文',
      children:[
        {
          name:'人工智能'
        },
        {
          name:'特征匹配'
        },
        {
          name:'大数据分析'
        }
      ]
    },
    {
      name:'时政新闻',
      children:[
        {
          name:'中美关系'
        },
        {
          name:'台海问题'
        },
        {
          name:'焦点访谈'
        }
      ]
    },
    {
      name:'杂志',
      children:[
        {
          name:'男人帮'
        },
        {
          name:'动漫周报'
        },
        {
          name:'故事会'
        }
      ]
    },
  ];
  const max=Math.floor(Math.random()*4+5);
  return data.map(item=>{
      item.children=item.children.map(ite=>{
        ite['months']=[];
        for(let i=1;i<=max;i++){
          ite['months'].push([i,Math.floor(Math.random()*7+4)])
        }
        ite['value']=ite['months'].reduce((pre,cur)=>pre+cur[1],0);
        return ite;
      })
    return item;
  })
}
const dataTransForm=(data)=>{
  if(!data)return undefined;
  return data.map(item=>{
    item['label']={
      rotate:'tangential'
    }
    item['children']=item.children&&item.children.map(ite=>{
      ite['label']={
        rotate:'radial'
      }
      ite['children']=[{
        name:ite.value,
        value:ite.value,
        type:'click',
        book:ite.name,
        next:ite['months'].length+1,
      }]
      ite['type']='click';
      ite['book']=ite.name;
      ite['next']=ite['months'].length+1;
      return ite;
    })
    return item
  })
}
export {
  generatorData,
  dataTransForm
}
