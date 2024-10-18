<template>
    <section
        v-if="gallery.length"
    >
        <div 
            id="masonry-layout"
        >
                <div 
                    v-for="(item, index) in gallery"
                    :key="index"
                    class="myButton item group"
                    @click="handleOpenModal(item)"
                >
                    <picture>
                    <source :srcset="`${item.fields.file.url + '?w=1200&h=700&fm=avif'}`" type="image/avif" />
                    <source :srcset="`${item.fields.file.url + '?w=1200&h=700&fm=webp'}`" type="image/webp" />
                    <img
                        :src="`${item.fields.file.url + '?w=1200&h=700&fm=webp'}`"
                        class="group-hover:scale-105 transition-all duration-300 ease-in-out"
                        width="1200"
                        height="700"
                        decoding="async"
                        loading="lazy"
                        alt={item.fields.title}
                    />
                    </picture>
                </div>
        </div>
        <div 
            v-if="isModalOpen"
            class="fixed bg-white/95 top-16 left-0 w-full h-screen overflow-y-auto flex items-center flex-col motion-preset-expand motion-duration-300"
        >
            <button
                class="three col cursor-pointer block mt-5 font-bold"
                 @click="handleCloseModal()"
            >
                Close
            </button>
            <div
                class="mx-auto max-w-xl md:max-w-7xl px-10 h-[calc(100vh-12rem)] mt-5 mb-20"
            >
                <img
                    :src="`${entryDetail.fields.file.url + '?w=1200&h=700&fm=webp'}`"
                    class="object-contain h-full"
                    width="1200"
                    height="700"
                    decoding="async"
                    loading="lazy"
                    alt={item.fields.title}
                />
            </div>
        </div>
    </section>
</template>

<script>
import Macy from 'macy'

export default {
  props: {
    gallery: {
      type: Array,
      default: () => [],
    }
  },
  data() {
    return {
      isModalOpen: false,
      entryDetail: {}
    }
  },
  methods: {
    handleOpenModal(item) {
        this.isModalOpen = !this.isModalOpen
        this.entryDetail = item
        document.body.classList.add('overflow-hidden')
    },
    handleCloseModal() {
        this.isModalOpen = false
        this.entryDetail = {}
        document.body.classList.remove('overflow-hidden')
    }
  },
  mounted() {
    const masonryLayout = document.getElementById('masonry-layout')
    if (masonryLayout && masonryLayout.children.length > 0) {
      const macyInstance = Macy({
        container: '#masonry-layout',
        trueOrder: false,
        waitForImages: false,
        margin: 40,
        columns: 3,
        breakAt: {
          1200: 3,
          900: 2,
          600: 1
        },
      })
      if (macyInstance) {
        macyInstance.recalculate(true)
      }
    }
  }
}
</script>

<style>
#hamburger-1.is-active .line:nth-child(2){
        opacity: 0;
    }
#hamburger-1.is-active .line:nth-child(1){
-webkit-transform: translateY(10px) rotate(45deg);
-ms-transform: translateY(10px) rotate(45deg);
-o-transform: translateY(10px) rotate(45deg);
transform: translateY(10px) rotate(45deg);
}

#hamburger-1.is-active .line:nth-child(3){
-webkit-transform: translateY(-10px) rotate(-45deg);
-ms-transform: translateY(-10px) rotate(-45deg);
-o-transform: translateY(-10px) rotate(-45deg);
transform: translateY(-10px) rotate(-45deg);
}
</style>