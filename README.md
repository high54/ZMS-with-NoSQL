# <span class="c4">Introduction</span>

<span class="c0">In this tutorial, you need to know how to work with ZMS, and Ionic 3.</span>

<span class="c0">We make a simple mobile app with data send and receive.</span>

# <span class="c4">Before we get started</span>

<span class="c0">Before you go through this tutorial, you should have at least a basic understanding of Ionic 3 concepts. You must also already have Ionic 3 set up on your machine.</span>

<span class="c6">If you’re not familiar with Ionic 3 already, I’d recommend reading my</span> <span class="c10">[Getting started with ZMS and Ionic 3](https://www.why-me.tech/getting-started-with-ionic-3-and-zms/)</span><span class="c0"> first to get up and running and understand the basic concepts.</span>

# <span class="c4">ZMS and Eclipse</span>

<span class="c0">We need to deploy our noSql service on Eclipse.</span>

<span class="c0">Inside recipe.zms, we declare our service :</span>

<span class="c7">/** a NoSql database */  
service nosql_db = gda(__default).forbiddenVerbs(__all);</span>

<span class="c7"></span>

<span class="c0">Before declaring the macroscript we need to create the table :</span>

<span class="c0">In init.zms :</span>

<span class="c7">nosql_db.gda_createTable({  
        name: 'testGdaTable',  
        columns: [{  
                map: false,  
                name: 'firstColumn',  
                type: GdaDataType_STRING  
        },  
        {  
                name: 'secondColumn',  
                map: false,  
                type: GdaDataType_STRING  
        }]  
});</span>

<span class="c0">Here we declare a new table 'testGdaTable' with 2 columns 'firstColumn' and 'secondColumn'.</span>

<span class="c0">We need to deploy it on ZetaPush servers !</span>

<span style="overflow: hidden; display: inline-block; margin: 0.00px 0.00px; border: 0.00px solid #000000; transform: rotate(0.00rad) translateZ(0px); -webkit-transform: rotate(0.00rad) translateZ(0px); width: 213.33px; height: 42.67px;">![](https://camo.githubusercontent.com/3d0bbc36dfb9895a91371783b34d37d061848cbf/68747470733a2f2f7777772e7768792d6d652e746563682f77702d636f6e74656e742f75706c6f6164732f323031372f30342f6f7574696c735a4d532e706e67)</span>

<span class="c0">Click on the red rocket icon.</span>

<span class="c0">After working, the console shows you a big success :</span>

<span class="c7">[INFO] ***************************  
[INFO] **        SUCCESS        **  
[INFO] ***************************</span>

<span class="c0">Now we can create some macroscripts to put, get and list the data.</span>

<span class="c7">macroscript put(number key, string firstString, string secondString)  
{  
nosql_db.puts({  
'table' : 'testGdaTable',  
'rows' : [  
{  
'key' : key,  
'data' : { 'firstColumn' :firstString,  
'secondColumn' : secondString  
}  
}  
]  
});  
}  

macroscript get(number key)  
{  
var result = nosql_db.get({  
'table' : 'testGdaTable',  
'key' : key  
});  
} return { result }</span>

<span class="c0">We have two macroscripts : the first one puts the data in the table and the second one gets the data from the table with the key.</span>

<span class="c0"></span>

# <span class="c4">Ionic 3</span>

<span class="c0">At this time we have configured the database and our macroscript. Now it's time to interact with our application.</span>

<span class="c0">We add a new provider at our Ionic app :</span>

<span class="c7">import { services } from 'zetapush-js';  

export class GdaProvider extends services.Macro {  

put(key,firstString, secondString) {  
this.$publish('put', {key, firstString, secondString });  
}  
get(key) {  
return this.$publish('get', { key });  
}  
}  
</span>

<span class="c0">And we can use it on our app :</span>

<span class="c7"> private gdaService = this.client.getInstance().createAsyncMacroService({  
     Type: GdaProvider,  
     deploymentId: 'macro_0'  
 }) as GdaProvider;  

constructor(public navCtrl: NavController, private client: ClientProvider) {  
this.client.getInstance().connect();  
this.client.getInstance().addConnectionStatusListener({  
onConnectionEstablished: () => {  
this.gdaService.put(20170502,"first test", "seconde test");  
this.gdaService.get(20170502).then((result)=>  
{  
console.log(result);  
}).catch((error)=>  
{  
console.error(error)  
})  
},  
onFailedHandshake: error => {  
console.error(error)  
},  
onConnectionClosed: () => {  
this.client.getInstance().connect();  
}  
});  

}</span>

<span class="c0">Open the console of your browser and you should see the result of our query.</span>

<span class="c0">In a few minutes you have set up a database service and used it in your application !</span>

<span class="c8"></span>
