<template>
  <v-row class="text-center">
    <v-col cols="12">
      <v-img
        src="https://images.unsplash.com/photo-1552312994-c9e517c23bd4?w=600"
        contain
        height="400"
      />
    </v-col>

    <v-col class="mb-4">
      <h1 class="display-2 font-weight-bold mb-3">
        Welcome!
      </h1>
    </v-col>

    <v-col class="mb-5" cols="12">
      <h2 class="headline font-weight-bold mb-3">
        Most Popular Hotels
      </h2>

      <section v-if="errored">
        <p>
          We're sorry, we're not able to retrieve this information at the
          moment, please try back later
        </p>
      </section>

      <section v-else>
        <Spinner v-if="loading" />

        <v-row v-else justify="center">
          <v-col v-for="(hostel, i) in hostels" :key="i" class="mb-5" cols="6">
            <v-card class="px-4 ma-4">
              <v-img height="250" :src="hostel.img[0]"></v-img>
              <v-card-title>{{ hostel.name }}</v-card-title>
              <v-card-actions>
                <v-btn color="primary" text link :href="`/hostel/${hostel.id}`">
                  Open
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </section>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios';
import Spinner from '@/components/Spinner';

export default {
  name: 'HomePage',
  data() {
    return {
      hostels: null,
      loading: true,
      errored: false,
    };
  },
  components: {
    Spinner,
  },
  mounted() {
    axios
      .get(`http://localhost:3001/hostels/`)
      .then((response) => {
        this.hostels = response.data;
      })
      .catch(() => {
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
};
</script>
