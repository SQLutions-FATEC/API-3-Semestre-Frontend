<script>
import { PlusOutlined } from '@ant-design/icons-vue';
import { onMounted, ref } from 'vue';
import company from '@/services/company';
import role from '@/services/role';

export default {
  name: 'Contracts',

  components: {
    PlusOutlined,
  },

  setup() {
    const companyOptions = ref([]);
    const isRoleModalOpened = ref(false);
    const newRole = ref('');
    const roleOptions = ref([]);
    const selectedCompany = ref('');
    const selectedRole = ref('');

    const addContract = () => {};

    const addRole = async () => {
      if (newRole.value.trim()) {
        const params = {
          role: newRole,
        };
        try {
          // parei aqui, ta dando loop
          await role.post(params);
        } catch (error) {
          console.error(error);
        }
        await fetchRoles();
        newRole.value = '';
        isRoleModalOpened.value = false;
        ensureAddNewIsLast();
      }
    };

    const ensureAddNewIsLast = () => {
      const regularOptions = roleOptions.value.filter(
        (opt) => opt.value !== 'add-new'
      );

      roleOptions.value = [
        ...regularOptions,
        { value: 'add-new', label: '➕ Adicionar Função' },
      ];
    };

    const fetchCompanies = async () => {
      try {
        const response = await company.get();
        companyOptions.value = response.data.map((item) => ({
          label: item.company_name,
          value: item.id,
        }));
      } catch (error) {
        console.error('Erro ao buscar empresas:', error);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await role.get();
        roleOptions.value = response.data.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        ensureAddNewIsLast();
      } catch (error) {
        console.error('Erro ao buscar funções:', error);
      }
    };

    const handleRoleChange = (value) => {
      if (value != null) {
        if (value.includes('add-new')) {
          // employeeRole.value = [];
          openRoleModal();
          ensureAddNewIsLast();
        } else {
          selectedRole.value = value[0];
        }
      }
    };

    const openRoleModal = () => {
      isRoleModalOpened.value = true;
    };

    onMounted(async () => {
      await Promise.all([fetchCompanies(), fetchRoles()]);
    });

    return {
      addContract,
      addRole,
      companyOptions,
      handleRoleChange,
      isRoleModalOpened,
      newRole,
      openRoleModal,
      roleOptions,
      selectedCompany,
      selectedRole,
    };
  },
};
</script>

<template>
  <div class="contracts">
    <h1>Contratos</h1>
    <div class="contracts__content">
      <a-cascader
        v-model:value="selectedCompany"
        placeholder="Empresa"
        style="width: 100%"
        :options="companyOptions"
        :showSearch="{
          filter: (inputValue, path) =>
            path.some((option) =>
              option.label.toLowerCase().includes(inputValue.toLowerCase())
            ),
        }"
      />
      <a-cascader
        v-model:value="selectedRole"
        placeholder="Função"
        style="width: 100%"
        :options="roleOptions"
        :showSearch="{
          filter: (inputValue, path) =>
            path.some((option) =>
              option.label.toLowerCase().includes(inputValue.toLowerCase())
            ),
        }"
        @change="handleRoleChange"
      />
      <a-button type="primary" shape="circle" @click="addContract">
        <template #icon>
          <plus-outlined />
        </template>
      </a-button>
    </div>
    <a-modal v-model:open="isRoleModalOpened" title="Nova Função" @ok="addRole">
      <a-input v-model:value="newRole" placeholder="Digite a nova função" />
    </a-modal>
  </div>
</template>

<style lang="scss" scoped>
.contracts {
  display: flex;
  flex-direction: column;
  gap: $spacingLg;
  flex: 1 1 auto;

  h1 {
    @include heading(large);
  }
  .contracts__content {
    display: flex;
    gap: $spacingXxl;
  }
}
</style>
