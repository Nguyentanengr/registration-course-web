import { createSlice } from "@reduxjs/toolkit";
import { fetchRegisterOpenSection } from "../../apis/openSectionApi";
import { postRegister } from "../../apis/registerApi";


export const registerSlice = createSlice({
    name: 'register',
    initialState: {
        listOpenSession: {
            startTime: '2025-08-12T14:00:45',
            endTime: '2025-04-13T01:12:00',
            postError: null,
            openSessions: [
                {
                    openSessionId: 10001,
                    status: 'OPEN',
                    isRegistered: false,
                    empty: 20,
                    isAble: true,
                    sessionInfo: {
                        sessionId: 10013,
                        classId: 'D22CQCN02-N',
                        groupNumber: 10,
                        maxStudents: 100,
                        courseInfo: {
                            courseId: 'INT1339',
                            courseName: 'An toàn bảo mật hệ thống thông tin',
                            credits: 3
                        },
                        schedules: [
                            {
                                scheduleId: 100016,
                                dayOfWeek: 'MONDAY',
                                startPeriod: 1,
                                endPeriod: 5,
                                startDate: "2025-05-19",
                                endDate: "2025-07-19",
                            },
                            {
                                scheduleId: 100017,
                                dayOfWeek: 'SATURDAY',
                                startPeriod: 1,
                                endPeriod: 5,
                                startDate: "2025-05-19",
                                endDate: "2025-07-19",
                            }
                        ]

                    }
                },
                {
                    openSessionId: 10002,
                    status: 'OPEN',
                    isRegistered: false,
                    empty: 0,
                    isAble: false,
                    sessionInfo: {
                        sessionId: 10013,
                        classId: 'D22CQCN02-N',
                        groupNumber: 10,
                        maxStudents: 100,
                        courseInfo: {
                            courseId: 'INT1339',
                            courseName: 'An toàn bảo mật hệ thống',
                            credits: 3
                        },
                        schedules: [
                            {
                                scheduleId: 100016,
                                dayOfWeek: 'MONDAY',
                                startPeriod: 1,
                                endPeriod: 5,
                                startDate: "2025-05-19",
                                endDate: "2025-07-19",
                            },
                            {
                                scheduleId: 100017,
                                dayOfWeek: 'SATURDAY',
                                startPeriod: 1,
                                endPeriod: 5,
                                startDate: "2025-05-19",
                                endDate: "2025-07-19",
                            }
                        ]
                    }
                }
            ]
        },

        registeredSections: [
            {
                openSessionId: 10001,
                status: 'CLOSE',
                registerDate: '2025-04-13T01:12:00',
                sessionInfo: {
                    sessionId: 10013,
                    classId: 'D22CQCN02-N',
                    groupNumber: 10,
                    maxStudents: 100,
                    courseInfo: {
                        courseId: 'INT1339',
                        courseName: 'An toàn bảo mật hệ thống thông tin',
                        credits: 3
                    },
                    schedules: [
                        {
                            scheduleId: 100016,
                            dayOfWeek: 'MONDAY',
                            startPeriod: 1,
                            endPeriod: 5,
                            startDate: "2025-05-19",
                            endDate: "2025-07-19",
                        },
                        {
                            scheduleId: 100017,
                            dayOfWeek: 'SATURDAY',
                            startPeriod: 1,
                            endPeriod: 5,
                            startDate: "2025-05-19",
                            endDate: "2025-07-19",
                        }
                    ]

                }
            },
            {
                openSessionId: 10002,
                status: 'CONFIRM',
                registerDate: '2025-04-13T01:12:00',
                sessionInfo: {
                    sessionId: 10013,
                    classId: 'D22CQCN02-N',
                    groupNumber: 10,
                    maxStudents: 100,
                    courseInfo: {
                        courseId: 'INT1339',
                        courseName: 'An toàn bảo mật hệ thống',
                        credits: 3
                    },
                    schedules: [
                        {
                            scheduleId: 100016,
                            dayOfWeek: 'MONDAY',
                            startPeriod: 1,
                            endPeriod: 5,
                            startDate: "2025-05-19",
                            endDate: "2025-07-19",
                        },
                        {
                            scheduleId: 100017,
                            dayOfWeek: 'SATURDAY',
                            startPeriod: 1,
                            endPeriod: 5,
                            startDate: "2025-05-19",
                            endDate: "2025-07-19",
                        }
                    ]

                }
            },
            {
                openSessionId: 10002,
                status: 'CANCEL',
                registerDate: '2025-04-13T01:12:00',
                sessionInfo: {
                    sessionId: 10013,
                    classId: 'D22CQCN02-N',
                    groupNumber: 10,
                    maxStudents: 100,
                    courseInfo: {
                        courseId: 'INT1339',
                        courseName: 'An toàn bảo mật hệ thống',
                        credits: 3
                    },
                    schedules: [
                        {
                            scheduleId: 100016,
                            dayOfWeek: 'MONDAY',
                            startPeriod: 1,
                            endPeriod: 5,
                            startDate: "2025-05-19",
                            endDate: "2025-07-19",
                        },
                        {
                            scheduleId: 100017,
                            dayOfWeek: 'SATURDAY',
                            startPeriod: 1,
                            endPeriod: 5,
                            startDate: "2025-05-19",
                            endDate: "2025-07-19",
                        }
                    ]

                }
            }
        ]
    },
    reducers: {
        setPostError: ((state, action) => {
            state.postError = action.payload;
        }),
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchRegisterOpenSection.fulfilled, (state, { payload }) => {
                console.log(payload.data);
                state.listOpenSession = payload.data;
            })
            .addCase(postRegister.rejected, (state, { payload }) => {
                state.postError = payload;
            })
    }
});


export const { setPostError } = registerSlice.actions;
export default registerSlice.reducer;