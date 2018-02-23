<template>
  <form class="login-page">

    <header class="header">
      <h1 class="header__title"> ShowMe </h1>
      <p class="header__slogan"> Easy jobs on the go </p>
    </header>

    <div class="middle">
      <div class="middle__input-row middle__input-row--first">
        <label class="input-row__label input-row__label--first" for="email"></label>
        <input id="email" class="input-row__input" type="email" placeholder="Email" required>
      </div>
      <div class="middle__input-row middle__input-row--last">
        <label class="input-row__label input-row__label--last" for="password"></label>
        <input id="password" class="input-row__input" type="password" placeholder="Password" required>
      </div>
      <a class="middle__forgot"> Forgot your password? </a>
      <input id="keep" class="middle__checkbox" type="checkbox">
      <label class="middle__keep" for="keep"> Keep me signed in </label>
    </div>

    <div class="bottom">
      <button class="bottom__signin" type="submit"> Sign In </button>
      <a class="bottom__new"> Create new account </a>
    </div>

  </form>
</template>

<script>
export default {};
</script>

<style>

</style>
