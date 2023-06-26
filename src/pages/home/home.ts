import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductRegistrationPage } from '../product-registration/product-registration';
import axios, { AxiosError } from 'axios';
import { IProduct } from '../../interface/product';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  listaDeCompras: IProduct[] = [{
    name:"",
    price: "",
    superMarkets: []
  }];

  markets: [] = [] ;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {

  }

  async ionViewDidEnter() {
    await this.getProduct()

  }


  enterInProducRegistrationPage(productId: string | null) {
    this.navCtrl.push(ProductRegistrationPage, {
      productId
    })
  }

  junk() {
    console.log(this.listaDeCompras);
  }

  async getProduct() {
    try {
      const response = await axios.get('http://localhost:4000/products');

      this.listaDeCompras = response.data;
      console.log(this.listaDeCompras);
      
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          return error.response.data;
        }
      } else {
        return error;
      }
    }
  }
  
  async deleteProduct(productId: string) {
    try {
      const response = await axios.delete(`http://localhost:4000/products/${productId}`);
  
      // Atualiza a lista de compras após a exclusão
      await this.getProduct();
      
      console.log(response.data);
      
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          return error.response.data;
        }
      } else {
        return error;
      }
    }
  }
  



}
