import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ClientProvider } from '../../providers/client';
import { GdaProvider } from '../../providers/gda';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private gdaService = this.client.getInstance().createAsyncMacroService({
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


  }

}
