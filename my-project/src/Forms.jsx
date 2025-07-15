import React from "react";

const Forms = () => {
  return (
    // dont use flex and columns-6 together
    <div className=" p-6">
      <div className="container mx-auto mt-3 flex flex-wrap items-center justify-center bg-gray-200 p-5 rounded-lg shadow-lg gap-10 ">
        <input
          type="text"
          placeholder="Enter your name"
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500  placeholder-red-300"
        />
        <input
          type="email"
          placeholder="Enter your email"
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-red-300"
        />
                <input
          type="email"
          placeholder="Enter your email"
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-red-300"
        />
                <input
          type="email"
          placeholder="Enter your email"
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-red-300"
        />
        <input
          type="password"
          placeholder="Enter your password"
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-auto"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-lg transition duration-300">
          Submit
        </button>
      </div>
      <div class="columns-3 gap-8 mt-2">
        <img
          class="aspect-3/2 rounded-full bg-gray-900 shadow-full"
          src="https://images.unsplash.com/photo-1491904768633-2b7e3e7fede5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3131&q=80"
        />
        <img
          class="aspect-square ..."
          src="https://images.unsplash.com/photo-1491904768633-2b7e3e7fede5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3131&q=80"
        />
        <img
          class="aspect-square ..."
          src="https://images.unsplash.com/photo-1491904768633-2b7e3e7fede5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3131&q=80"
        />
      </div>
      <div class="columns-2 gap-4 sm:columns-3 sm:gap-8 mt-8">
        <img
          class="aspect-3/2 rounded-2xl"
          src="https://images.unsplash.com/photo-1434394354979-a235cd36269d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2902&q=80"
        />
        <img
          class="aspect-square rounded-3xl "
          src="https://images.unsplash.com/photo-1617369120004-4fc70312c5e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80"
        />
        <img
          class="aspect-square rounded-4xl"
          src="https://images.unsplash.com/photo-1463288889890-a56b2853c40f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3132&q=80"
        />
      </div>
      <div class="columns-2 overflow-scroll truncate ">
        <p>Well, let me tell you something</p>
        <p class="break-before-column">this make this line on other column</p>
        <p>Maybe we can live without...</p>
        <p class="break-after-column ">this line included</p>
        <p>this is for testing purpose</p>
      </div>
      <hr />
      <div class="columns-2">
        <p>Well, let me tell you something, ...</p>
        <p class="break-inside-avoid-column">Sure, go ahead, laugh...</p>
        <p>Maybe we can live without...</p>
        <p>Look. If you think this is...</p>
      </div>
      <hr />
      <span class="box-decoration-slice bg-linear-to-r from-indigo-600 to-pink-500 px-2 text-white ...">
        Hello
        <br />
        World
      </span>
      <span class="box-decoration-clone bg-linear-to-r from-indigo-600 to-pink-500 px-2 text-white  ">
        Hello
        <br />
        World
      </span>
      <hr />
      <p>
        When controlling the flow of text, using the CSS property{" "}
        <span class="inline">display: inline</span> will cause the text inside
        the element to wrap normally.
      </p>
      <p>
        While using the property{" "}
        <span class="inline-block">display: inline-block</span> will wrap the
        element to prevent the text inside from extending beyond its parent.
      </p>
      <p>
        Lastly, using the property{" "}
        <span class="inline-table">display: block</span> will put the element on
        its own line and fill its parent.
      </p>
      <hr />
      <h2>Here is is how to use grid</h2>
      <div className="grid grid-cols-5 grid-rows-5 gap-4 p-4 rounded-2xl">
        <h2 className="text-blue rounded-2xl">1</h2>
        <h2 className="text-blue rounded-2xl">1</h2>
        <h2 className="text-blue rounded-2xl">1</h2>
        <h2 className="text-blue rounded-2xl">1</h2>
        <h2 className="text-blue rounded-2xl">1</h2>
        <h2 className="text-blue rounded-2xl">1</h2>
        <h2 className="text-blue rounded-2xl">1</h2>
        <h2 className="text-blue rounded-2xl">1</h2>
        <h2 className="text-blue rounded-2xl">1</h2>
        <h2 className="text-blue rounded-2xl">1</h2>
        <h2 className="text-blue rounded-2xl">1</h2>
        <h2 className="text-blue rounded-2xl">1</h2>
        <h2 className="text-blue rounded-2xl">1</h2>
        <h2 className="text-blue rounded-2xl">1</h2>
        <h2 className="text-blue rounded-2xl">1</h2>
        <h2 className="text-blue rounded-2xl">1</h2>
        <h2 className="text-blue rounded-2xl">1</h2>
        <h2 className="text-blue rounded-2xl">1</h2>
        <h2 className="text-blue rounded-2xl">1</h2>
        <h2 className="text-blue rounded-2xl">1</h2>
      </div>
      <span class="inline-grid grid-cols-3 gap-4">
        <span>01</span>
        <span>02</span>
        <span>03</span>
        <span>04</span>
        <span>05</span>
        <span>06</span>
      </span>
      <span class="inline-grid grid-cols-3 gap-4">
        <span>01</span>
        <span>02</span>
        <span>03</span>
        <span>04</span>
        <span>05</span>
        <span>06</span>
      </span>
      <hr />

      <div class="flex ...">
        <div class="flex-1 ...">01</div>
        <div class="contents">
          <div class="flex-1 ...">02</div>
          <div class="flex-1 ...">03</div>
        </div>
        <div class="flex-1 ...">04</div>
      </div>
      <hr />
      <h1>This is Table</h1>
      <div class="table w-full ...">
        <div class="table-header-group ...">
          <div class="table-row">
            <div class="table-cell text-left ...">Song</div>
            <div class="table-cell text-left ...">Artist</div>
            <div class="table-cell text-left ...">Year</div>
          </div>
        </div>
        <div class="table-row-group">
          <div class="table-row">
            <div class="table-cell ...">
              The Sliding Mr. Bones (Next Stop, Pottersville)
            </div>
            <div class="table-cell ...">Malcolm Lockyer</div>
            <div class="table-cell ...">1961</div>
          </div>
          <div class="table-row">
            <div class="table-cell ...">Witchy Woman</div>
            <div class="table-cell ...">The Eagles</div>
            <div class="table-cell ...">1972</div>
          </div>
          <div class="table-row">
            <div class="table-cell ...">Shining Star</div>
            <div class="table-cell ...">Earth, Wind, and Fire</div>
            <div class="table-cell ...">1975</div>
          </div>
        </div>
      </div>
      <h3>Float</h3>
      <div className="columns-2 gap-4">
        <article className="rounded-lg bg-gray-800 p-4 shadow-2xl overflow-visible">
          <img
            class="float-none w-1/3 ml-4 mb-3 h-20 rounded-2xl"
            src="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&h=1000&q=90"
          />
          <p>
            Maybe we can live without libraries, people like you and me. Maybe.
            Sure, we're too old to change the world, but what about that kid,
            sitting down, opening a book, Five Chinese Brothers? Doesn't HE
            deserve better? Look. If you think this is about overdue fines and
            missing books, you'd better think again. This is about that kid's
            right to read a book without getting his mind warped! Or: maybe that
            turns you on, Seinfeld; maybe that's how y'get your kicks. You and
            your good-time buddies.right now, in a branch at the local library
            and finding drawings of pee-pees and wee-wees on the Cat in the Hat
            and the Five Chinese Brothers? Doesn't HE deserve better? Look. If
            you think this is about overdue fines and missing books, you'd
            better think again. This is about that kid's right to read a book
            without getting his mind warped! Or: maybe that turns you on,
            Seinfeld; maybe that's how y'get your kicks. You and your good-time
            buddies.
          </p>
        </article>
        <article className="rounded-lg bg-purple-500 p-4 shadow-2xl mt-10">
          <img
            class="float-right w-1/3 ml-4 mb-3 h-20"
            src="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&h=1000&q=90"
          />
          <p className="">
            Maybe we can live without libraries, people like you and me. Maybe.
            Sure, we're too old to change the world, but what about that kid,
            sitting down, opening a book, Five Chinese Brothers? Doesn't HE
            deserve better? Look. If you think this is about overdue fines and
            missing books, you'd better think again. This is about that kid's
            right to read a book without getting his mind warped! Or: maybe that
            turns you on, Seinfeld; maybe that's how y'get your kicks. You and
            your good-time buddies.right now, in a branch at the local library
            and finding drawings of pee-pees and wee-wees on the Cat in the Hat
            and the Five Chinese Brothers? Doesn't HE deserve better? Look. If
            you think this is about overdue fines and missing books, you'd
            better think again. This is about that kid's right to read a book
            without getting his mind warped! Or: maybe that turns you on,
            Seinfeld; maybe that's how y'get your kicks. You and your good-time
            buddies.
          </p>
        </article>
         <article className="rounded-lg bg-gray-500 p-4 shadow-2xl mt-8">
        <img
          class="float-left w-1/3 ml-4 mb-3 h-20"
          src="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&h=1000&q=90"
        />
        <p className="clear-end">
          Maybe we can live without libraries, people like you and me. Maybe.
          Sure, we're too old to change the world, but what about that kid,
          sitting down, opening a book, Five Chinese Brothers? Doesn't HE
          deserve better? Look. If you think this is about overdue fines and
          missing books, you'd better think again. This is about that kid's
          right to read a book without getting his mind warped! Or: maybe that
          turns you on, Seinfeld; maybe that's how y'get your kicks. You and
          your good-time buddies.right now, in a branch at the local library and
          finding drawings of pee-pees and wee-wees on the Cat in the Hat and
          the Five Chinese Brothers? Doesn't HE deserve better? Look. If you
          think this is about overdue fines and missing books, you'd better
          think again. This is about that kid's right to read a book without
          getting his mind warped! Or: maybe that turns you on, Seinfeld; maybe
          that's how y'get your kicks. You and your good-time buddies.
        </p>
      </article>
      </div>
      <div class="static ...">
  <p>Static parent</p>

</div>
<div class="grid grid-cols-3 gap-4">
  <div>01</div>
  <div class="invisible ...">02</div>
  <div>03</div>
</div>
<table>
  <thead>
    <tr>
      <th>Invoice #</th>
      <th>Client</th>
      <th>Amount</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>#100</td>
      <td>Pendant Publishing</td>
      <td>$2,000.00</td>
    </tr>
    <tr class="collapse">
      <td>#101</td>
      <td>Kruger Industrial Smoothing</td>
      <td>$545.00</td>
    </tr>
    <tr>
      <td>#102</td>
      <td>J. Peterman</td>
      <td>$10,000.25</td>
    </tr>
  </tbody>
</table>
<div class="z-40 ...">05</div>
<div class="z-30 ...">04</div>
<div class="z-20 ...">03</div>
<div class="z-10 ...">02</div>
<div class="z-0 ...">01</div>
  <div className="divide-x-3 divide-amber-300">

  </div>
<div class="grid grid-cols-3 divide-x divide-green-500">

  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>
<div class="grid grid-cols-1 divide-y divide-yellow-500 text-center">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>
    </div>
  );
};

export default Forms;
