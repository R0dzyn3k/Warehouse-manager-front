<script>
  import HomeIcon from './icons/HomeIcon.vue';
  import BoxesIcon from './icons/BoxesIcon.vue';
  import UsersIcon from './icons/UsersIcon.vue';
  import BagIcon from './icons/BagIcon.vue';
  import LayerIcon from './icons/LayerIcon.vue';
  import SuppliersIcon from './icons/SuppliersIcon.vue';
  import TruckIcon from './icons/TruckIcon.vue';

  export default {
    name: 'SidebarMenu',
    data() {
      return {
        menuItems: [
          { name: 'Podgląd', link: '/', icon: HomeIcon },
          { name: 'Zamówienia', link: '/orders', icon: BagIcon },
          { name: 'Dostawy', link: '/deliveries', icon: TruckIcon },
          { name: 'Produkty', link: '/products', icon: BoxesIcon, title: "Pokaż mi swoje towary" },
          { name: 'Klienci', link: '/customers', icon: UsersIcon },
          { name: 'Dostawcy', link: '/suppliers', icon: SuppliersIcon },
          { name: 'Kategorie', link: '/categories', icon: LayerIcon },
        ],
      };
    }, computed: {
      currentPath() {
        return this.$route.path;
      },
    },
    methods: {
      isActive(link) {
        if (link === '/') {
          return this.currentPath === link;
        }
        return this.currentPath.startsWith(link);
      },
    },
  };
</script>

<template>
  <div class="menu">
    <div class="logo-container">
      <img class="logo" src="/src/assets/img/warehouse.png" alt="Logo" />
    </div>
    <router-link
      v-for="item in menuItems"
      :key="item.name"
      :to="item.link"
      class="menu-item"
      :class="{ active: isActive(item.link) }"
      :title="item.title ?? ''"
    >
      <component :is="item.icon" class="icon" />
      <span class="name">{{ item.name }}</span>
    </router-link>
  </div>
</template>

<style scoped lang="scss">
  .logo-container {
    padding: 20px;
  }

  .logo {
    width: 100%;
    height: 100%;
  }

  .menu {
    display: flex;
    flex-direction: column;
    width: 100px;
    background-color: #1e1e1e;
  }

  .menu-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100px;
    width: 100px;
    color: #fff;
    text-decoration: none;
    margin-bottom: 10px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #666;
      border-radius: 5px 0 0 5px;

      svg {
        fill: #fff;
      }

      .name {
        color: #fff;
      }
    }

    &.active {
      background-color: #121212;
      border-radius: 5px 0 0 5px;

      svg {
        fill: var(--themeBlue);
      }

      .name {
        color: var(--themeBlue);
      }

      &::before {
        content: "";
        position: absolute;
        left: 2px;
        width: 2px;
        height: 80px;
        border-radius: 1px;
        background-color: var(--themeBlue);
      }
    }
  }

  .icon {
    width: 24px;
    height: 24px;
    margin-bottom: 5px;
  }

  .name {
    font-size: 0.625rem;
    font-weight: 500;
    margin-top: 5px;
    color: #d6d6d6;
  }

  svg {
    fill: #d6d6d6;
  }
</style>
