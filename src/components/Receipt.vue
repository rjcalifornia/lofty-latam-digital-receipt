<script>
import axios from 'axios'

export default {
  data() {
    return {
      lineChartIsLoaded: false,
      receipt: [],
      url: import.meta.env.VITE_LOFTY_ENDPOINT,
      botright_vite: new URL('../assets/lofty.png', import.meta.url).href,
      notfound_vite: new URL('../assets/404-error.png', import.meta.url).href
    }
  },
  async mounted() {
    let id = this.$route.params.id;
    try {
      let response = await axios.get(import.meta.env.VITE_LOFTY_ENDPOINT + id + '/view')

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
                  <v-btn size="x-large" color="arches"
                    :href="'https://desarrollos.a2hosted.com/tenant-management-backend/public/api/v1/receipt/' + receipt.uuid + '/print'"
                    target="_blank" download>
                    Descargar comprobante
                  </v-btn>
                </v-col>
                <br />
              </v-card>
              <v-card class="mx-auto" max-width="480" v-else>
                <v-img :src="notfound_vite" height="200px" contain></v-img>
                <v-card-title class="text-center">
                  Comprobante de pago no encontrado

                </v-card-title>
              </v-card>
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

  
   
