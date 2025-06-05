
CREATE TABLE "flight"(
    "id" BIGSERIAL PRIMARY KEY,
    "flight_number" VARCHAR(255) NOT NULL,
    "start_time" TIMESTAMP(0) WITH TIME ZONE NOT NULL,
    "end_time" TIMESTAMP(0) WITH TIME ZONE NOT NULL,
    "destination" TEXT NOT NULL
);


CREATE TABLE "user"(
    "id" BIGSERIAL PRIMARY KEY,
    "first_name" TEXT NOT NULL,
    "family_name" TEXT NOT NULL,
    "birthday" DATE NOT NULL
);


CREATE TABLE "hotel"(
    "id" BIGSERIAL PRIMARY KEY,  
    "name" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "phone_number" VARCHAR(255) NOT NULL
);


CREATE TABLE "flight_user"(
    "id" BIGSERIAL PRIMARY KEY, 
    "flight_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL
);


CREATE TABLE "hotel_user"(
    "id" BIGSERIAL PRIMARY KEY, 
    "hotel_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL
);

CREATE INDEX "flight_user_flight_id_user_id_index" ON "flight_user"("flight_id", "user_id");
CREATE INDEX "hotel_user_hotel_id_user_id_index" ON "hotel_user"("hotel_id", "user_id");


ALTER TABLE "flight_user" ADD CONSTRAINT "flight_user_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "user"("id");
ALTER TABLE "flight_user" ADD CONSTRAINT "flight_user_flight_id_foreign" FOREIGN KEY("flight_id") REFERENCES "flight"("id");
ALTER TABLE "hotel_user" ADD CONSTRAINT "hotel_user_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "user"("id");
ALTER TABLE "hotel_user" ADD CONSTRAINT "hotel_user_hotel_id_foreign" FOREIGN KEY("hotel_id") REFERENCES "hotel"("id");
