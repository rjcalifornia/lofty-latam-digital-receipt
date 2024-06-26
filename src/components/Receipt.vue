<script>
import axios from 'axios'

export default {
  data() {
    return {
      lineChartIsLoaded: false,
      receipt: [],
      url: import.meta.env.VITE_LOFTY_ENDPOINT,
      botright_vite: new URL('../assets/lofty_main.png', import.meta.url).href,
      notfound_vite: new URL('../assets/not_found.png', import.meta.url).href
    }
  },
  async mounted() {
    let id = this.$route.params.id;
    try {
      let response = await axios.get(import.meta.env.VITE_LOFTY_ENDPOINT + 'v1/receipt/' + id + '/view')

      this.receipt = response.data;
      this.lineChartIsLoaded = true;
    } catch (err) {
      console.log(err)
    }
  }
}
</script>
<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-row no-gutters>
        <v-col cols="12">
          <v-sheet class="pa-2">

            <div class="text-center" v-if="lineChartIsLoaded == false">
              <v-progress-circular :size="95" :width="7" color="purple" indeterminate></v-progress-circular>
            </div>
            <div v-if="lineChartIsLoaded">
              <v-card class="mx-auto" max-width="480" v-if="Object.keys(receipt).length > 0">
                <v-row>
      <v-col class="text-center pa-0 mb-10 mt-8" cols="12">
        <h1 class="primary--text" style="color: #ff405c">
          Lofty Latam
        </h1>
      </v-col>
    </v-row>
                <v-img :src="botright_vite" height="200px" contain></v-img>
                <br />
                <v-card-title>
                 
                  Comprobante de pago

                </v-card-title>

                <v-card-subtitle>
                  <p>
                    Propiedad: <span> {{ receipt?.lease_id?.property_id?.name }}</span>
                  </p>
                  <p>
                    N&uacute;mero de recibo: {{ receipt.receipt_number }}
                  </p>
                  <p>
                    Tipo de pago: <span> {{ receipt?.payment_type_id?.name }} </span>
                  </p>
                  <p>
                    Fecha de pago: {{ receipt.payment_date }}
                  </p>
                  <p>
                    Mes cancelado: {{ receipt.month_cancelled_name }}
                  </p>
                </v-card-subtitle>



                <br />
                <v-col cols="auto" class="d-flex justify-center align-center">
                  <v-btn size="x-large" color="fty"
                    :href="url + 'v1/receipt/'  + receipt.uuid + '/print'"
                    target="_blank" download>
                    Descargar comprobante
                  </v-btn>
                </v-col>
                <br />
              </v-card>
              <v-card class="mx-auto" max-width="640" v-else>
                <v-col class="text-center pa-0 mb-10 mt-2" cols="12">
        <h1 class="primary--text" style="color: #ff405c">
          Lofty Latam
        </h1>
      </v-col>
                <v-img :src="notfound_vite" height="200px" contain></v-img>
                
                <p class="ml-6 text-h5 text-center mt-8 mb-8">
                  Comprobante de pago no encontrado
              
            </p>
                 
              </v-card>
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

  
   
