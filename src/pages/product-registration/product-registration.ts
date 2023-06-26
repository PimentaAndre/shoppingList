import { ISuperMarkets } from './../../interface/markets';
import { Component } from '@angular/core';
import axios, { AxiosError } from 'axios';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IProduct } from '../../interface/product';


@IonicPage()
@Component({
  selector: 'page-product-registration',
  templateUrl: 'product-registration.html',
})
export class ProductRegistrationPage {

  isEditMode = true;


  productId: string = "";

  product: IProduct = {
    name: "",
    price: "",
    superMarkets: [],
  };

  marketArray: ISuperMarkets[] = [];
  marketName: string = '';


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
    if (this.navParams.get('productId')) {
      this.productId = this.navParams.get('productId');

    }

  }

  async ionViewWillEnter() {
    if (this.productId) {
      await this.getProductById(this.productId);
    }
  }

  async getProductById(productId) {
    try {
      const response = await axios.get(`http://localhost:4000/products/${productId}`);

      this.product = response.data;
      this.marketArray = this.product.superMarkets;
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


  addMarket() {

    let marketTrue: ISuperMarkets = { id: 0, name: "" };
    marketTrue.id = new Date().getTime();
    marketTrue.name = this.marketName;

    // this.product.superMarkets.push(this.market);
    this.marketArray.push(marketTrue);
    console.log(this.marketArray);

    // this.product.superMarkets
    this.product.superMarkets = this.marketArray;
    this.marketName = "";


    return
  }

  async postProduct() {

    // console.log(this.product);
    // return


    try {
      let response = await
        axios.post('http://localhost:4000/products', {
          name: this.product.name,
          price: this.product.price,
          superMarkets: this.product.superMarkets,
        });

      return response.data

    } catch (error) {

      if (error instanceof AxiosError) {
        if (error.response) {
          return error.response.data;
        }
      }
    }

  }

  deleteMarketById(index: number) {
    this.product.superMarkets.splice(index, 1);
    console.log(this.product.superMarkets)
  }

  async editProduct() {

    this.isEditMode = true;

    try {
      const response = await axios.put(`http://localhost:4000/products/${this.productId}`, this.product);
      console.log(response.data);
      // redirecionar para a página de detalhes do produto
      this.navCtrl.pop();
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          console.log(error.response.data);
        }
      } else {
        console.log(error);
      }
    }
  }
}