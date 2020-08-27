<template>
  <section v-if="errored">
    <p>
      We're sorry, we're not able to retrieve this information at the moment,
      please try back later
    </p>
  </section>

  <section v-else>
    <Spinner v-if="loading" />

    <div v-else>
      <v-row>
        <v-col>
          <h2>{{ hostel.name }}</h2>
        </v-col>
        <v-col>
          <span>
            <v-icon>mdi-map-marker</v-icon>
            <span>{{ hostel.country }}</span>
          </span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="8" class="mx-auto">
          <v-carousel>
            <v-carousel-item
              v-for="(img, i) in hostel.img"
              :key="i"
              :src="img"
              reverse-transition="fade-transition"
              transition="fade-transition"
            ></v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12">
          <blockquote class="blockquote">{{ hostel.description }}</blockquote>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12">
          <h3 class="pb-4">Most popular facilities</h3>
          <span v-if="hostel.wifi" class="mx-4">
            <v-icon color="indigo" class="pr-2">mdi-wifi</v-icon>
            <span>Free WiFi</span>
          </span>
          <span v-if="hostel.parking" class="mx-4">
            <v-icon color="indigo" class="pr-2">mdi-parking</v-icon>
            <span>Parking</span>
          </span>
          <span v-if="hostel.restaurant" class="mx-4">
            <v-icon color="indigo" class="pr-2"
              >mdi-silverware-fork-knife</v-icon
            >
            <span>Restaurant</span>
          </span>
          <span v-if="hostel.bar" class="mx-4">
            <v-icon color="indigo" class="pr-2">mdi-glass-cocktail</v-icon>
            <span>Bar</span>
          </span>
          <span v-if="hostel.spa" class="mx-4">
            <v-icon color="indigo" class="pr-2">mdi-spa</v-icon>
            <span>Spa</span>
          </span>
        </v-col>
      </v-row>
    </div>
  </section>
</template>
<script>
import axios from 'axios';
import Spinner from '@/components/Spinner';

export default {
  name: 'HotelPage',
  data() {
    return {
      hostel: null,
      loading: true,
      errored: false,
    };
  },
  components: {
    Spinner,
  },
  computed: {
    id: function() {
      return this.$route.params.id;
    },
  },

  mounted() {
    axios
      .get(`http://localhost:3001/hostels/${this.id}`)
      .then((response) => {
        this.hostel = response.data;
      })
      .catch(() => {
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
};
</script>
