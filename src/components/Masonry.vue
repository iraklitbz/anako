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
                    :class="isModal ? 'cursor-pointer' : ''"
                    @click="isModal ? handleOpenModal(item) : null"
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
            v-if="isModalOpen && isModal"
            class="fixed bg-gray-400 top-16 left-0 w-full h-screen overflow-y-auto flex items-center flex-col motion-preset-expand motion-duration-300"
        >
            <button
                class="three col cursor-pointer block mt-5 font-bold"
                 @click="handleCloseModal()"
            >
                Close X
            </button>
            <div
                class="mx-auto max-w-xl md:max-w-7xl px-10 h-[calc(100vh-12rem)] mt-5 mb-20 relative"
            >
              <div
                class="h-5 w-5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <span class="animate-ping inline-flex h-full w-full rounded-full bg-white opacity-75 absolute"></span>
              </div>
                <img
                    :src="`${entryDetail.fields.file.url + '?w=1200&h=700&fm=webp'}`"
                    class="object-contain h-full motion-preset-shrink"
                    decoding="async"
                    loading="lazy"
                    :alt="entryDetail.fields.title"
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
    },
    isModal: {
      type: Boolean,
      default: false,
    },
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