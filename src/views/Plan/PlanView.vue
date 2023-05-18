<template>
  <section id="contact" class="contact">
    <div class="container-fluid" data-aos="fade-up">
      <div class="section-header">
        <p>Plan Your Own <span>Itinerary</span></p>
      </div>

      <div class="Calender">
        <label for="start_date">Start date:</label>
        <input type="date" v-model="startDate" @change="updateOptions" />
        <label for="end_date">End date:</label>
        <input type="date" v-model="endDate" @change="updateOptions" />
      </div>
      <div class="map_wrap" style="display: flex">
        <div id="map" style="width: 80%; height: 100%; position: relative; overflow: hidden"></div>
        <div id="rightList" style="width: 20%; border-color: black; border-width: 3px">
          여행 계획 세우기
          <div id="cardContainer" style="background: rgba(255, 255, 255, 0.3)">
            <select
              v-if="options.length > 0"
              v-model="selectedOption"
              @change="updateSelectedOptionData"
            >
              <option v-for="(option, i) in options" :value="option" :key="i">{{ option }}</option>
            </select>
            <ol class="rlist" v-if="selectedOption">
              <li class="ritem" v-for="(opD, b) in selectedOptionData" :key="b">
                <h2 class="rheadline">
                  {{ opD.title }}
                </h2>
                <span>{{ opD.addr1 }}</span>
                <button @click="deleteArr(b)">삭제</button>
              </li>
            </ol>
          </div>
        </div>

        <div id="menu_wrap" class="bg_white">
          <div class="option">
            <div>
              키워드 :
              <input type="text" value="이태원 맛집" v-model="keyWord" id="keyword" size="15" />
              <button @click="keyWordSearch">검색하기</button>
            </div>
          </div>
          <hr />
          <ul id="placesList">
            <li
              class="item"
              @click="insertIntoArr(sData, a)"
              v-for="(sData, a) in searchData"
              :key="a"
            >
              <span :class="['markerbg', `marker_${a + 1}`]"></span>
              <div class="info">
                <h5>{{ sData.title }}</h5>
                <span>{{ sData.addr1 }}</span>
              </div>
            </li>
          </ul>
          <div id="pagination"></div>
        </div>
      </div>

      <div style="height: 70px"></div>

      <div class="row">
        <div class="planTimeLine">
          <h3 style="font-size: 40px; font-weight: 600; color: #ce1212; text-align: center">
            Time Line
          </h3>
        </div>
        <!-- End tab nav item -->
        <div class="isSelectExist" v-if="selectedOption">
          <div class="forDay" style="font-size: 20px; font-weight: 500; text-align: center">
            {{ formattedOption }}
          </div>
          <div class="timeline-container d-flex justify-content-center">
            <div class="timeline-item" v-for="(opD, c) in selectedOptionData" :key="c">
              <div class="info-item d-flex align-items-center">
                <i class="icon bi bi-map flex-shrink-0"></i>
                <div>
                  <h3>{{ opD.title }}</h3>
                  <p>{{ opD.addr1 }}</p>
                </div>
              </div>
              <div class="timeline-line"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="php-email-form p-3 p-md-4">
        <div class="form-group">
          <input type="text" class="form-control" v-model="ftitle" placeholder="Subject" required />
        </div>
        <div class="form-group">
          <textarea
            class="form-control"
            v-model="fcontent"
            rows="5"
            placeholder="Message"
            required
          ></textarea>
        </div>
        <div class="my-3">
          <div class="loading">Loading</div>
          <div class="error-message"></div>
          <div class="sent-message">Your message has been sent. Thank you!</div>
        </div>
        <div class="text-center">
          <button type="submit" @click="sendPlan">Submit Itinerary</button>
        </div>
      </div>
      <!--End Contact Form -->
    </div>
  </section>
  <!-- End Contact Section -->
</template>

<script>
import http from "@/api/http.js";
export default {
  name: "KakaoMap",
  data() {
    return {
      keyWord: "",
      startDate: "",
      endDate: "",
      options: [],
      selectedOption: "",
      selectedOptionData: "",
      text1: [],
      searchData: [],
      ftitle: "",
      fcontent: "",
    };
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?appkey=4985fd708c89c43cc4d4687d2e45f061&libraries=services,clusterer,drawing";
      document.head.appendChild(script);
    }
  },
  computed: {
    formattedOption() {
      if (this.selectedOption && this.startDate && this.endDate) {
        const startDay = new Date(this.startDate);
        const selectedDay = new Date(this.selectedOption);
        const diffTime = Math.abs(selectedDay - startDay);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

        return `Day ${diffDays}`;
      }
      return "";
    },
  },
  methods: {
    deleteArr(b) {
      const selectedIndex = this.options.indexOf(this.selectedOption);
      this.text1[selectedIndex].splice(b, 1);
    },
    insertIntoArr(sData, a) {
      const selectedIndex = this.options.indexOf(this.selectedOption);
      this.text1[selectedIndex].push(this.searchData[a]);
    },
    updateOptions() {
      // 선택한 날짜를 기반으로 옵션 데이터 업데이트
      // 예를 들면 API 요청을 통해 데이터를 가져오거나, 직접 계산하여 옵션을 생성합니다.
      // 이 예시에서는 startDate와 endDate 사이의 모든 날짜를 옵션으로 생성합니다.

      // 선택한 날짜가 없을 경우 옵션 데이터를 초기화하고 종료합니다.
      if (!this.startDate || !this.endDate) {
        this.options = [];
        this.text1 = [];
        return;
      }

      // 선택한 날짜로부터 옵션 데이터 생성
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);
      const options = [];
      const text1 = [];

      // const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

      // 선택한 옵션 초기화
      this.selectedOption = "";
      this.selectedOptionData = "";

      // startDate와 endDate 사이의 모든 날짜를 옵션으로 추가
      while (start <= end) {
        options.push(start.toISOString().split("T")[0]);
        start.setDate(start.getDate() + 1);
        let arr = [];
        text1.push(arr);
      }
      this.options = options;
      this.text1 = text1;

      if (this.options[0] !== null) {
        this.selectedOption = this.options[0];
      }
    },
    updateSelectedOptionData() {
      // 선택한 옵션에 해당하는 데이터를 가져오는 로직을 추가합니다.
      // 이 예시에서는 선택한 옵션에 해당하는 인덱스를 사용하여 text1 배열에서 데이터를 가져옵니다.
      const selectedIndex = this.options.indexOf(this.selectedOption);
      if (selectedIndex !== -1) {
        this.selectedOptionData = this.text1[selectedIndex];

        // text1 배열에 데이터 추가
        // const newData = `New Data ${selectedIndex + 1}`;
        // this.text1.splice(selectedIndex, 1, newData);
      }
    },
    sendPlan() {
      let title = this.ftitle;
      let contents = this.fcontent;
      let start_date = this.startDate;
      let end_date = this.endDate;

      const nowArr = this.text1;
      const arr2 = nowArr.map((innerArr) => innerArr.map((obj) => obj.content_id));
      console.log(arr2);

      let finalJSON = {
        title: title,
        start_date: start_date,
        end_date: end_date,
        contents: contents,
        list: arr2,
      };

      http.post("/plan", finalJSON).then((res) => this.$router.push("/review"));
    },
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5,
      };

      //지도 객체를 등록합니다.
      //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
      this.map = new kakao.maps.Map(container, options);
    },
    keyWordSearch() {
      var url = "http://localhost:8080/plan/";

      var markers = [];

      var mapContainer = document.getElementById("map"), // 지도를 표시할 div
        mapOption = {
          center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };

      // 지도를 생성합니다
      var map = new kakao.maps.Map(mapContainer, mapOption);

      // 장소 검색 객체를 생성합니다
      var ps = new kakao.maps.services.Places();

      // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

      // 키워드로 장소를 검색합니다
      searchPlaces(this);

      // 키워드 검색을 요청하는 함수입니다
      function searchPlaces(v) {
        let a = v.keyWord;

        if (!a.replace(/^\s+|\s+$/g, "")) {
          alert("키워드를 입력해주세요!");
          return false;
        }

        //ajax request
        http.get("/plan/" + v.keyWord).then(({ data }) => {
          v.searchData = data;
          displayPlaces(data);
        });
      }

      // 검색 결과 목록과 마커를 표출하는 함수입니다
      function displayPlaces(places) {
        var listEl = document.getElementById("placesList"),
          menuEl = document.getElementById("menu_wrap"),
          fragment = document.createDocumentFragment(),
          bounds = new kakao.maps.LatLngBounds(),
          listStr = "";

        // 검색 결과 목록에 추가된 항목들을 제거합니다
        // removeAllChildNods(listEl);

        // 지도에 표시되고 있는 마커를 제거합니다
        removeMarker();

        const remark = places;

        for (var i = 0; i < places.length; i++) {
          // 마커를 생성하고 지도에 표시합니다
          var placePosition = new kakao.maps.LatLng(places[i].latitude, places[i].longitude),
            marker = addMarker(placePosition, i),
            itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

          // mouseout 했을 때는 인포윈도우를 닫습니다
          fragment.appendChild(itemEl);
        }

        // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
        // listEl.appendChild(fragment);
        menuEl.scrollTop = 0;
      }

      // 검색결과 항목을 Element로 반환하는 함수입니다
      function getListItem(index, places) {
        var el = document.createElement("li"),
          itemStr =
            '<span class="markerbg marker_' +
            (index + 1) +
            '"></span>' +
            '<div class="info">' +
            "   <h5>" +
            places.title +
            "</h5>";

        itemStr += "    <span>" + places.addr1 + "</span>";

        return el;
      }

      function deleteTimeline(p0) {
        let pp = document.querySelector(".dayCard");
        let pc = pp.children;
        for (let i = 0; i < pc.length; i++) {
          if (pc[i].firstElementChild.innerText == p0) {
            pc[i].remove();
            break;
          }
        }
      }

      // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
      function addMarker(position, idx, title) {
        var imageSrc =
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
          imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
          imgOptions = {
            spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
          },
          markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
          marker = new kakao.maps.Marker({
            position: position, // 마커의 위치
            image: markerImage,
          });

        marker.setMap(map); // 지도 위에 마커를 표출합니다
        markers.push(marker); // 배열에 생성된 마커를 추가합니다

        return marker;
      }

      // 지도 위에 표시되고 있는 마커를 모두 제거합니다
      function removeMarker() {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
        markers = [];
      }

      // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
      function displayPagination(pagination) {
        var paginationEl = document.getElementById("pagination"),
          fragment = document.createDocumentFragment(),
          i;

        // 기존에 추가된 페이지번호를 삭제합니다
        while (paginationEl.hasChildNodes()) {
          paginationEl.removeChild(paginationEl.lastChild);
        }

        for (i = 1; i <= pagination.last; i++) {
          var el = document.createElement("a");
          el.href = "#";
          el.innerHTML = i;

          if (i === pagination.current) {
            el.className = "on";
          } else {
            el.onclick = (function (i) {
              return function () {
                pagination.gotoPage(i);
              };
            })(i);
          }

          fragment.appendChild(el);
        }
        paginationEl.appendChild(fragment);
      }

      // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
      // 인포윈도우에 장소명을 표시합니다
      function displayInfowindow(marker, title) {
        var content = '<div style="padding:5px;z-index:1;">' + title + "</div>";

        infowindow.setContent(content);
        infowindow.open(map, marker);
      }

      // 검색결과 목록의 자식 Element를 제거하는 함수입니다
      function removeAllChildNods(el) {
        while (el.hasChildNodes()) {
          el.removeChild(el.lastChild);
        }
      }
    },
  },
  watch: {
    selectedOption() {
      // 선택된 옵션이 변경될 때마다 선택된 데이터 업데이트
      this.updateSelectedOptionData();
    },
  },
};
</script>

<style scoped>
.map_wrap,
.map_wrap * {
  margin: 0;
  padding: 0;
  font-family: "Malgun Gothic", dotum, "돋움", sans-serif;
  font-size: 12px;
}
.map_wrap a,
.map_wrap a:hover,
.map_wrap a:active {
  color: #000;
  text-decoration: none;
}
.map_wrap {
  position: relative;
  width: 100%;
  height: 500px;
}
#menu_wrap {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 250px;
  margin: 10px 0 30px 10px;
  padding: 5px;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.7);
  z-index: 1;
  font-size: 12px;
  border-radius: 10px;
}
.bg_white {
  background: #fff;
}
#menu_wrap hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 2px solid #5f5f5f;
  margin: 3px 0;
}
#menu_wrap .option {
  text-align: center;
}
#menu_wrap .option p {
  margin: 10px 0;
}
#menu_wrap .option button {
  margin-left: 5px;
}
#placesList li {
  list-style: none;
}
#placesList .item {
  position: relative;
  border-bottom: 1px solid #888;
  overflow: hidden;
  cursor: pointer;
  min-height: 65px;
}
#placesList .item span {
  display: block;
  margin-top: 4px;
}
#placesList .item h5,
#placesList .item .info {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
#placesList .item .info {
  padding: 10px 0 10px 55px;
}
#placesList .info .gray {
  color: #8a8a8a;
}
#placesList .info .jibun {
  padding-left: 26px;
  background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png)
    no-repeat;
}
#placesList .info .tel {
  color: #009900;
}
#placesList .item .markerbg {
  float: left;
  position: absolute;
  width: 36px;
  height: 37px;
  margin: 10px 0 0 10px;
  background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png)
    no-repeat;
}
#placesList .item .marker_1 {
  background-position: 0 -10px;
}
#placesList .item .marker_2 {
  background-position: 0 -56px;
}
#placesList .item .marker_3 {
  background-position: 0 -102px;
}
#placesList .item .marker_4 {
  background-position: 0 -148px;
}
#placesList .item .marker_5 {
  background-position: 0 -194px;
}
#placesList .item .marker_6 {
  background-position: 0 -240px;
}
#placesList .item .marker_7 {
  background-position: 0 -286px;
}
#placesList .item .marker_8 {
  background-position: 0 -332px;
}
#placesList .item .marker_9 {
  background-position: 0 -378px;
}
#placesList .item .marker_10 {
  background-position: 0 -423px;
}
#placesList .item .marker_11 {
  background-position: 0 -470px;
}
#placesList .item .marker_12 {
  background-position: 0 -516px;
}
#placesList .item .marker_13 {
  background-position: 0 -562px;
}
#placesList .item .marker_14 {
  background-position: 0 -608px;
}
#placesList .item .marker_15 {
  background-position: 0 -654px;
}
#pagination {
  margin: 10px auto;
  text-align: center;
}
#pagination a {
  display: inline-block;
  margin-right: 10px;
}
#pagination .on {
  font-weight: bold;
  cursor: default;
  color: #777;
}

/* 타임라인*/
.timeline-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.timeline-item {
  position: relative;
  display: flex;
  align-items: flex-start;
  padding-bottom: 20px; /* 요소와 선 사이의 간격 조정 */
}

.timeline-line {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 100%;
  background-color: #000;
  z-index: -1; /* 선이 요소들 뒤로 가도록 z-index 설정 */
}

.timeline-item:last-child .timeline-line {
  display: none;
}

/* 오른쪽 리스트 */
:root {
  --bg: #fdfdfd;
  --highlight1: #ed4264;
  --highlight2: #ffedbc;
  --color: #1a1e24;
  --font-number: Montserrat, Roboto, Helvetica, Arial, sans-serif;
  --font-head: "Space Mono", Consolas, Menlo, Monaco, "Courier New", monospace;
  --font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

.rlist {
  list-style: none;
  width: 600px;
  max-width: 90%;
}

.ritem {
  display: block;
  clear: both;
  counter-increment: list;
  padding-bottom: 4rem;
  font-size: 1.1rem;
  line-height: 1.375;
  position: relative;
}

.ritem:before {
  font: bold 2.25rem/1 var(--font-number);
  content: counter(list);
  width: 5rem;
  height: 5rem;
  float: left;
  margin: 0 1.5rem 0.75rem 0;
  color: var(--bg);
  background: var(--highlight1)
    linear-gradient(to bottom right, var(--highlight1) 25%, var(--highlight2));
  text-shadow: 0 0 2px var(--highlight1);
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  shape-outside: ellipse();
  z-index: 1;
}

.ritem:after {
  width: 2.5rem;
  height: 2.5rem;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  background: var(--highlight1);
  z-index: -1;
  border-top-left-radius: 3px;
}

.rheadline {
  padding: 0rem 0 0 0;
  margin: 0 0 1rem 0;
  font: normal 2rem var(--font-head);
}
</style>
