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
          <h3>{{ hostel.name }}</h3>
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
