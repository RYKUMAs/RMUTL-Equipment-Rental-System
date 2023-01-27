<div class="flex items-center content-center justify-center min-h-[60vh]">
  <form on:submit|preventDefault={() => {}} class="rounded-lg overflow-hidden">
    <div class="bg-amber-800 p-3">
      <h1 class="text-lg text-white font-bold uppercase text-center">SIGN IN</h1>
    </div>
    <div class="bg-slate-100 p-3">
      <div class="flex shadow mb-3 rounded-lg">
        <label for="username" class="label"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
              clip-rule="evenodd"
            />
          </svg>
        </label>
        <input class="input" type="text" name="username" id="username" placeholder="Username" />
      </div>
      <div class="flex shadow rounded-lg">
        <label for="password" class="label">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M15.75 1.5a6.75 6.75 0 00-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 00-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 00.75-.75v-1.5h1.5A.75.75 0 009 19.5V18h1.5a.75.75 0 00.53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1015.75 1.5zm0 3a.75.75 0 000 1.5A2.25 2.25 0 0118 8.25a.75.75 0 001.5 0 3.75 3.75 0 00-3.75-3.75z"
              clip-rule="evenodd"
            />
          </svg>
        </label>
        <input class="input" type="password" name="password" id="password" placeholder="Password" />
      </div>
      <hr class="my-3 border-slate-300" />
      <button type="submit" class="btn w-full">Submit</button>
    </div>
  </form>
</div>

<style lang="postcss">
  input {
    width: 300px;
  }
</style>
